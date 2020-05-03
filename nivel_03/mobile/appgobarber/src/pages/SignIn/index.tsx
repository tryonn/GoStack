import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import logoImg from '../../assets/logo.png';


const SingIn: React.FC = () => (

    <Container>
        <Image source={logoImg}/>


        <Title>Faça seu Login</Title>
    </Container>

);


export default SingIn;
