import React from 'react';

import Button from '../../components/button';
import Input from '../../components/input';

import { Image, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation();

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

                        <Input name="name" icon="user" placeholder="Nome" />
                        <Input name="email" icon="mail" placeholder="E-mail" />
                        <Input name="password" icon="lock" placeholder="Senha" />

                        <Button onPress={() => { }}>Cadastrr</Button>
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
