import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimatorContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';



import api from '../../services/api';
import { useToast } from '../../hook/Toast';



interface ForgotPasswordForm {
    email: String;
}


const ForgotPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();

    const handleOnSubmit = useCallback(async (data: ForgotPasswordForm) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
            });

            await schema.validate(data, { abortEarly: false, });

            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro',
                description: 'Você já pode fazer seu logon no GoBarber'
            });

        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
            }

            addToast({
                type: 'info',
                title: 'Erro na recuperação de senha',
                description: 'Ocorreu um erro  ao tentar realizar a recuperação de senha, tente novamente',
            });


        }
    }, [addToast]);

    return (

        <Container>
            <Background />
            <Content>
                <AnimatorContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleOnSubmit}>
                        <h1>Recuperar Senha</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Button type="submit">Recuperar</Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                Voltar ao login
            </Link>
                </AnimatorContainer>
            </Content>
        </Container>
    )
}

export default ForgotPassword;
