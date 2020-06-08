import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppontment, Section, Appointment, Calendar } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hook/Auth';
import API from '../../services/api';

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {

    const { singnOut, user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {

        const provider_id = user.id;

        API.get(`/providers/${provider_id}/month-availability`, {
            params: {
                month: currentMonth.getMonth() + 1,
                year: currentMonth.getFullYear(),
            }
        }).then(response => {
            console.log("as" + response.data)
            console.log("222" + response.data);
            setMonthAvailability(response.data);
        });

    }, [currentMonth, user.id]);


    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter(monthDays => monthDays.available === false).map(monthDays => {

                const month = currentMonth.getMonth();
                const year = currentMonth.getFullYear();
                return new Date(year, month, monthDays.day);
            });

        return dates;

    }, [currentMonth, monthAvailability]);

    // <img src={user.avatar_url} alt={user.name} />
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
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]}
                        fromMonth={new Date()}
                        disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] },
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Naio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>


    );
};

export default Dashboard;
