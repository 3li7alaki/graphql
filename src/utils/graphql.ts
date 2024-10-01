// utils/graphql.ts
import axios from 'axios';

// Define the base URL for your GraphQL API
const GRAPHQL_API_URL = 'https://learn.reboot01.com/api/graphql-engine/v1/graphql';

/**
 * Helper to send a GraphQL query or mutation.
 * @param query - The GraphQL query or mutation string.
 * @param variables - Optional variables for the query/mutation.
 * @param token - JWT token for authentication (optional).
 * @returns The response from the GraphQL API.
 */
export const graphqlRequest = async (
    query: string,
    variables = {},
    token?: string
) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    // If a JWT token is provided, add the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await axios.post(
            GRAPHQL_API_URL,
            {
                query,
                variables,
            },
            { headers }
        );

        // Return only the data from the response
        return response.data;
    } catch (error) {
        console.error('GraphQL Request Error:', error.response || error.message);
        // throw new Error('Failed to make GraphQL request.');
    }
};

/**
 * Example function to fetch user data from the API.
 * @param token - JWT token for authentication.
 * @returns The user's data.
 */
export const getUserData = async (token: string) => {
    const query = `
        query UserDetails {
          user {
            id
            firstName
            lastName
            login
            email
            events(where: { event: { path: { _eq: "/bahrain/bh-module" } } }) {
              level
            }
          }
          transaction_aggregate(
            where: { event: { path: { _eq: "/bahrain/bh-module" } }, type: { _eq: "xp" } }
          ) {
            aggregate {
              sum {
                amount
              }
            }
          }
        }
  `;


    // Call the generic GraphQL request function
    const response = await graphqlRequest(query, {}, token);
    const user = response.data.user[0];

    user.level = user?.events[0].level;
    user.xp = response?.data.transaction_aggregate.aggregate.sum.amount;
    user.events = undefined;
    user.token = token;

    return user;
};

export const getAuditData = async (token: string, id: number) => {
    const query = `
        query AuditAggregate($userId: Int!) {
          audit_aggregate(
            where: {
              _and: [
                { auditorId: { _eq: $userId } }
                {
                  _or: [
                    { _and: [{ resultId: { _is_null: true } }, { grade: { _is_null: true } }] }
                    { grade: { _is_null: false } }
                  ]
                }
              ]
            }
          ) {
            aggregate {
              count
            }
          }
          user {
            totalUp
            totalDown
            auditRatio
          }
        }
    `;

    const variables = { userId: id };

    // Call the generic GraphQL request function
    const response = await graphqlRequest(query, variables, token);

    const data = {
        count: 0,
        up: 0,
        down: 0,
        ratio: 0,
    };

    data.count = response?.data.audit_aggregate.aggregate.count;
    data.up = response?.data.user[0].totalUp;
    data.down = response?.data.user[0].totalDown;
    data.ratio = response?.data.user[0].auditRatio;

    return data;
}

export const getSkills = async (token: string) => {
    const query = `
      query skills {
        transaction(
          where: {
            type: {
              _iregex: "(^|[^[:alnum:]_])[[:alnum:]_]*skill_[[:alnum:]_]*($|[^[:alnum:]_])"
            }
          }
        ) {
          amount
          type
        }
      }
    `;

    const response = await graphqlRequest(query, {}, token);

    const skills = response.data.transaction.reduce((acc, { type, amount }) => {
        const skill = type.replace('skill_', '');

        if (acc[skill] && acc[skill] > amount) return acc;

        acc[skill] = amount;
        return acc;
    }, {});

    return skills;
}

export const getXPProgression = async (token: string, id: number) => {
    const query = `
        query XPProgression($userId: Int!) {
          transaction(
            where: {
              userId: { _eq: $userId }
              type: { _eq: "xp" }
              event: { path: { _eq: "/bahrain/bh-module" } }
            }
            order_by: { createdAt: asc }
          ) {
            amount
            createdAt
          }
        }
    `;

    const variables = { userId: id };

    const response = await graphqlRequest(query, variables, token);

    const progression = response.data.transaction.map(({ amount, createdAt }) => ({
        date: new Date(createdAt),
        xp: amount,
    }));

    return progression;
}