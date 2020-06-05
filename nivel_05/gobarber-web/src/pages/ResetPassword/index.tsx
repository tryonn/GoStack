import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { FiLock } from 'react-icons/fi'

import { useToast } from '../../hook/Toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimatorContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();
    const history = useHistory();

    const handleOnSubmit = useCallback(async (data: ResetPasswordFormData) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    'Confirmação incorreta',
                ),
            });

            await schema.validate(data, { abortEarly: false, });

            history.push('/signin');

        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
            }

            addToast({
                type: 'info',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro  ao resetar senha, tente novamente',
            });
        }
    }, [addToast, history]);


    return (
        <Container>
            <Content>
                <AnimatorContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleOnSubmit}>
                        <h1>Resetar Senha</h1>
                        <Input name="password" type="password" icon={FiLock} placeholder="Nova Senha" />
                        <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmação da Senha" />

                        <Button type="submit">Alterar Senha</Button>

                    </Form>
                </AnimatorContainer>
            </Content>
            <Background />
        </Container>
    )
};

export default ResetPassword;
