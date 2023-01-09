import axios from 'axios';
import {
    createContext, useEffect, useMemo, useState,
} from 'react';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

    const login = async (inputs) => {
        const { data } = await axios.post('/auth/login', inputs);
        setCurrentUser(data);
    };

    const logout = async () => {
        await axios.post('/auth/logout');
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    const context = useMemo(() => ({
        currentUser, setCurrentUser, login, logout,
    }), [currentUser, login, logout]);

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}
