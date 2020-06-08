import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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

interface Appointment {
    id: string;
    date: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {

    const { singnOut, user } = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

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
            setMonthAvailability(response.data);
        });

    }, [currentMonth, user.id]);

    useEffect(() => {

        API.get('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then(response => {
            setAppointments(response.data);

            console.log(response.data);
        });
    }, [selectedDate]);


    const disabledDays = useMemo(() => {
        const dates = monthAvailability
            .filter(monthDays => monthDays.available === false).map(monthDays => {

                const month = currentMonth.getMonth();
                const year = currentMonth.getFullYear();
                return new Date(year, month, monthDays.day);
            });

        return dates;

    }, [currentMonth, monthAvailability]);


    const selectedDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBR,
        });
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', { locale: ptBR });
    }, [selectedDate]);

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
                        {isToday(selectedDate) && <span>Hoje</span>}
                        <span>{selectedDateAsText}</span>
                        <span>{selectedWeekDay}</span>
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
