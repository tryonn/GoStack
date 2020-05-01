import React, { createContext, useCallback, useState } from 'react';

import API from '../services/api';

interface AuthState {
    token: string;
    user: Object;
}

interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: Object;
    signIn(credencials: SignInCredencials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    // só funciona quando o usuario der refresh ba pagina
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@Gobarber:user');
        if (token && user) {
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

        setData({ token, user });

    }, []);



    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext, AuthProvider };
