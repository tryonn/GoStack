import React from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';


const SignUp: React.FC = () => (
    <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <form>
                <h1>Faça seu cadastro</h1>
                <Input name="user" icon={FiUser} placeholder="User"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" type="password" icon={FiLock} placeholder="Senha"/>
                <Button type="submit">Cadastrar</Button>
            </form>

            <a href="">
                <FiArrowLeft/>
                Voltar para logon
            </a>
        </Content>
    </Container>
)

export default SignUp;
