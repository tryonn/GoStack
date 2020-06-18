import React, { createContext, useCallback, useState, useContext } from 'react';

import API from '../services/api';

interface User {

    id: string;
    name: string;
    email: string;
    avatar_url: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn(credencials: SignInCredencials): Promise<void>;
    singnOut(): void;
    updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    // só funciona quando o usuario der refresh ba pagina
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@Gobarber:user');
        if (token && user) {
            API.defaults.headers.authorization = `Bearer ${token}`;
            return { token, user: JSON.parse(user) };
        }


        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {

        const response = await API.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@Gobarber:user', JSON.stringify(user));

        API.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });

    }, []);

    const singnOut = useCallback(() => {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@Gobarber:user');

        setData({} as AuthState);
    }, []);


    const updateUser = useCallback((user: User) => {

        localStorage.setItem('@Gobarber:user', JSON.stringify(user));

        setData({
            token: data.token,
            user,
        });

    }, [setData, data.token]);


    return (
        <AuthContext.Provider value={{ user: data.user, signIn, singnOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
export { AuthProvider, useAuth };
