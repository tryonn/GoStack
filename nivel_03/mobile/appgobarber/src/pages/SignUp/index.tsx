import React, { useCallback, useRef } from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import api from '../../services/api';

import * as Yup from 'yup';

import {
        Image,
        View,
        KeyboardAvoidingView,
        Platform,
        ScrollView,
        TextInput,
        Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    BackToSigIn,
    BackToSigInText
} from './styles';


interface SignUpForm {
    name: String;
    email: String;
    password: String;
}

const SingUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();


    const handleSubmit = useCallback( async (data: SignUpForm) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos')
            });

            await schema.validate(data, { abortEarly: false, });

            console.log(data);

           await api.post('/users', data);

           Alert.alert(
               'Cadastro',
               'Você já pode fazer seu logon no GoBarber',
           );


           navigation.goBack();

        } catch (e) {
            if (e instanceof Yup.ValidationError){

                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
                return ;
            }

           /* addToast({
                type: 'info',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro  ao fazer cadastro. Tente novamente',
            });*/

            Alert.alert(
                "Erro no Cadastro",
                "Ocorreu um erroao fazer cadastro, tente novamente",
              );

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
                             }}>Cadastro</Button>
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
