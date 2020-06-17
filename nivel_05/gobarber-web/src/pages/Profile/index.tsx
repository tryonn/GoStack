import React, { useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, AvatarInput } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';



import api from '../../services/api';
import { useToast } from '../../hook/Toast';
import { useAuth } from '../../hook/Auth';



interface ProfileForm {
    name: String;
    email: String;
    password: String;
}


const Profile: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const { user } = useAuth();

    const handleOnSubmit = useCallback(async (data: ProfileForm) => {

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
            if (e instanceof Yup.ValidationError) {
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
            <header>
                <div>

                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>
            <Content>
                <Form
                    ref={formRef}
                    initialData={
                        {
                            name: user.name,
                            email: user.email,
                        }
                    }
                    onSubmit={handleOnSubmit}>

                    <AvatarInput>
                        <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>

                    <h1>Meu Perfil</h1>

                    <Input name="name" icon={FiUser} placeholder="Name" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Input containerStyle={{ marginTop: 24 }} name="old_password" type="password" icon={FiLock} placeholder="Senha Atual" />
                    <Input name="password" type="password" icon={FiLock} placeholder="Nova Senha" />
                    <Input name="password_confirmation" type="password" icon={FiLock} placeholder="Confirmar Senha" />
                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Profile;
