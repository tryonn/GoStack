import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';


const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const handleOnSubmit = useCallback( async (data: object) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos')
            });

            await schema.validate(data, { abortEarly: false, });

        } catch (e) {
            const err = getValidationErrors(e);
            formRef.current?.setErrors(err);
        }
    }, []);

    return (

        <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleOnSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Name"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="">
                <FiArrowLeft/>
                Voltar para logon
            </a>
        </Content>
    </Container>
    )
}

export default SignUp;
