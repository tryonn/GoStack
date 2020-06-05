import React, { useCallback, useRef, useState } from 'react';
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

    const [loading, setLoading] = useState(false);

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();

    const handleOnSubmit = useCallback(async (data: ForgotPasswordForm) => {

        try {

            setLoading(true);

            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
            });

            await schema.validate(data, { abortEarly: false, });

            await api.post('/password/forgot', {
                email: data.email,
            });

            addToast({
                type: 'success',
                title: 'E-mail de recuperação enviado',
                description: 'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada'
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


        } finally {
            setLoading(false);
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
                        <Button loading={loading} type="submit">Recuperar</Button>
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
