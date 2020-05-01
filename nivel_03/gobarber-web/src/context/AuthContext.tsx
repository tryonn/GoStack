import React, { createContext, useCallback } from 'react';

import API from '../services/api';


interface SignInCredencials {
    email: string;
    password: string;
}

interface AuthContextData {
    name: string;
    signIn(credencials: SignInCredencials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const signIn = useCallback(async ({ email, password }) => {

        const response = await API.post('sessions', {
            email,
            password,
        });


        console.log(response.data);

    }, []);



    return (
        <AuthContext.Provider value={{ name: 'Simão', signIn }}>
            {children}
        </AuthContext.Provider>
    );
};


export { AuthContext, AuthProvider };
