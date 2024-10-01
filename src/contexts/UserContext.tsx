// userContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    level: number;
    token: string;
    xp: number;
}

type UserState = User | null;

type UserAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'CLEAR_USER' };

interface UserContextType {
    user: UserState;
    dispatch: React.Dispatch<UserAction>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case 'CLEAR_USER':
            localStorage.removeItem('user');
            return null;
        default:
            return state;
    }
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};