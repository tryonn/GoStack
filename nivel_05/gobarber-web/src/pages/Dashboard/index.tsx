import React, { useState } from 'react';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppontment, Section, Appointment, Calendar } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hook/Auth';

const Dashboard: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());

    // <img src={user.avatar_url} alt={user.name} />

    const { singnOut, user } = useAuth();
    return (

        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>

                        <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
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

            <Content>
                <Schedule>
                    <h1>Horário agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>

                    <NextAppontment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />

                            <strong>Simao Menezes</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppontment>

                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4" alt="simao" />
                            </div>
                        </Appointment>
                    </Section>

                </Schedule>
                <Calendar>

                </Calendar>
            </Content>
        </Container>


    );
};

export default Dashboard;
