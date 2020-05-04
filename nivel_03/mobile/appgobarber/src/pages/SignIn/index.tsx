import React from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import logoImg from '../../assets/logo.png';

import {
        Container,
        Title,
        ForgotPassword,
        ForgotPasswordText,
        CreateAccountButton,
        CreateAccountButtonText
    } from './styles';

const SingIn: React.FC = () => {

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : undefined}
                enabled
            >

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Container>

                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu Login</Title>
                        </View>

                        <Input name="email" icon="mail" placeholder="E-mail" />
                        <Input name="password" icon="lock" placeholder="Senha" />

                        <Button onPress={() => { }}>Entrar</Button>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                    <CreateAccountButton onPress={ () => {} }>
                        <Icon name="log-in" size={20} color="#ff9000"/>
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>

                </ScrollView>

            </KeyboardAvoidingView>
        </>
    );
};

export default SingIn;
