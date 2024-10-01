// utils/auth.ts
import axios from 'axios';
import {deleteCookie} from "cookies-next";

/**
 * Sends login request to the server.
 * @param identifier Username or email
 * @param password User password
 */
export const login = async (identifier: string, password: string) => {
    const basicAuth = btoa(`${identifier}:${password}`);

    return axios.post('https://learn.reboot01.com/api/auth/signin', null, {
        headers: {
            Authorization: `Basic ${basicAuth}`,
        },
    }).then((response) => {
        return [response.data, response.status];
    }).catch((error) => {
        return [error.response.data, error.response.status];
    });
};

/**
 * Logs the user out by clearing localStorage and calling the server API route.
 */
export const logout = async () => {
    // Clear the user-related data in localStorage
    localStorage.removeItem('user');
    deleteCookie('token');
};
