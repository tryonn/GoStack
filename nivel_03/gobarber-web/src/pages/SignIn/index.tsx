import React, { useRef, useCallback, useContext } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { AuthContext } from '../../context/AuthContext';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { user, signIn } = useContext(AuthContext);

    console.log(user);

    const handleOnSubmit = useCallback(async (data: SignInFormData) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos')
            });

            await schema.validate(data, { abortEarly: false, });

            signIn(
                {
                    email: data.email,
                    password: data.password,
                }
            );

        } catch (e) {
            const err = getValidationErrors(e);
            formRef.current?.setErrors(err);
        }
    }, [signIn]);


    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleOnSubmit}>
                    <h1>Faça seu logon</h1>
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </Form>

                <a href="">
                    <FiLogIn />
                Criar conta
            </a>
            </Content>
            <Background />
        </Container>
    )
};

export default SignIn;
