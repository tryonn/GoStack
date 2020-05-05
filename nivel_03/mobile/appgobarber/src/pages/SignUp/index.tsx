import React, { useCallback, useRef } from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import {
        Image,
        View,
        KeyboardAvoidingView,
        Platform,
        ScrollView,
        TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    BackToSigIn,
    BackToSigInText
} from './styles';

const SingUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleSubmit = useCallback((data: Object) => {

        console.log(data);

    }, [])

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
                        <Form ref={formRef} onSubmit={handleSubmit}>

                            <Input
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    emailInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                textContentType="newPassword"
                                returnKeyType="send"
                                onSubmitEditing={
                                    () => {
                                        formRef.current?.submitForm();
                                     }
                                }
                                />

                            <Button onPress={() => {
                                formRef.current?.submitForm();
                             }}>Cadastrr</Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>

            <BackToSigIn onPress={() => navigation.goBack() }>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSigInText>Voltar para logon</BackToSigInText>
            </BackToSigIn>

        </>
    );
};

export default SingUp;
