import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimatorContainer } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';



import api from '../../services/api';
import { useToast } from '../../hook/Toast';



interface SignUpForm {
    name: String;
    email: String;
    password: String;
}


const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleOnSubmit = useCallback( async (data: SignUpForm) => {

        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 dígitos')
            });

            await schema.validate(data, { abortEarly: false, });

            await api.post('/users', data);

            addToast({
                type: 'success',
                title: 'Cadastro',
                description: 'Você já pode fazer seu logon no GoBarber'
            });

            history.push('/');

        } catch (e) {
            if (e instanceof Yup.ValidationError){
                const err = getValidationErrors(e);
                formRef.current?.setErrors(err);
            }

            addToast({
                type: 'info',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro  ao fazer cadastro. Tente novamente',
            });


        }
    }, [addToast, history]);

    return (

        <Container>
        <Background />
        <Content>
        <AnimatorContainer>
            <img src={logoImg} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleOnSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Name"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
                <FiArrowLeft/>
                Voltar para logon
            </Link>
        </AnimatorContainer>
        </Content>
    </Container>
    )
}

export default SignUp;
