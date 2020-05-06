import React, { useCallback, useRef} from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import { Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hook/Auth';

import * as Yup from 'yup';

import logoImg from '../../assets/logo.png';

import {
        Container,
        Title,
        ForgotPassword,
        ForgotPasswordText,
        CreateAccountButton,
        CreateAccountButtonText
    } from './styles';


    interface SignInFormData {
        email: string;
        password: string;
    }

const SingIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const { signIn, user } = useAuth();



    const handleSubmit = useCallback(async (data: SignInFormData) => {

        try {

            console.log(user);

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos')
            });

            await schema.validate(data, { abortEarly: false, });

           await signIn(
                {
                    email: data.email,
                    password: data.password,
                }
            );



        } catch (e) {

            if (e instanceof Yup.ValidationError){
                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
            }

            Alert.alert(
                "Alert Title",
                "My Alert Msg",
              );
            //("Teste", "Ocorreu um erro  ao fazer login, cheque as credenciais");
        }
    }, []);

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
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
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
                                returnKeyType="send"
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm();
                                }}
                            />

                            <Button onPress={() => {
                                formRef.current?.submitForm();
                            }}>Entrar</Button>

                        </Form>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                    <CreateAccountButton onPress={ () => navigation.navigate('SignUp') }>
                        <Icon name="log-in" size={20} color="#ff9000"/>
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>

                </ScrollView>

            </KeyboardAvoidingView>
        </>
    );
};

export default SingIn;
