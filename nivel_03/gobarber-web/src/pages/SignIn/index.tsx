import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { useAuth } from '../../hook/Auth';
import { useToast } from '../../hook/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimatorContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleOnSubmit = useCallback(async (data: SignInFormData) => {

        try {
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

            history.push('/dashboard');

        } catch (e) {
            if (e instanceof Yup.ValidationError){
                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
            }

            addToast({
                type: 'info',
                title: 'Erro  na autenticação',
                description: 'Ocorreu um erro  ao fazer login, cheque as credenciais',
            });
        }
    }, [signIn, addToast]);


    return (
        <Container>
            <Content>
                <AnimatorContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleOnSubmit}>
                        <h1>Faça seu logon</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" type="password" icon={FiLock} placeholder="Senha" />
                        <Button type="submit">Entrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                    Criar conta
                </Link>

                </AnimatorContainer>
            </Content>
            <Background />
        </Container>
    )
};

export default SignIn;
