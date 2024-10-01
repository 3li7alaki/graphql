// utils/jwt.ts
import {jwtDecode} from "jwt-decode";

/**
 * Decodes a JWT and returns its payload.
 * @param token JWT token
 */
export const decodeJWT = (token: string) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
};

/**
 * Checks if a JWT is expired.
 * @param token JWT token
 */
export const isJWTExpired = (token: string) => {
    const decoded = decodeJWT(token);
    if (decoded && decoded.exp) {
        const expiryDate = new Date(decoded.exp * 1000);
        return expiryDate < new Date();
    }
    return true;
};
