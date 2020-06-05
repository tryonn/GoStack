import React from 'react';

import { Container, Header, HeaderContent, Profile } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { useAuth } from '../../hook/Auth';

const Dashboard: React.FC = () => {

    const { singnOut, user } = useAuth();
    return (

        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt={user.name} />
                        <div>
                            <span>Bem-Vindo</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={singnOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
        </Container>

    );
};

export default Dashboard;
