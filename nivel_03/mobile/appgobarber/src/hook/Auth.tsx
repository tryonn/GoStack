import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

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
    singnOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {

    // só funciona quando o usuario der refresh ba pagina
    const [data, setData] = useState<AuthState>( {} as AuthState);

    useEffect(() => {
        async function loadStoragedData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@Gobarber:user',
            ]);

            if (token[1] && user[1]){
                setData({ token: token[1], user: JSON.parse(user[1]) });
            }
        }

        loadStoragedData();

    }, []);

    const signIn = useCallback(async ({ email, password }) => {

        const response = await API.post('sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@Gobarber:user', JSON.stringify(user)]
        ]);

        setData({ token, user });

    }, []);

    const singnOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@Gobarber:user']);
        setData({} as AuthState);
    },[]);



    return (
        <AuthContext.Provider value={{ user: data.user, signIn, singnOut }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
export { AuthProvider, useAuth};
