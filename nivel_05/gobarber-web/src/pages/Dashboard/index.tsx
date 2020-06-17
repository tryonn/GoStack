import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppontment, Section, Appointment, Calendar } from './styles';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';
import { useAuth } from '../../hook/Auth';
import API from '../../services/api';
import { Link } from 'react-router-dom';


interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    date: string;
    hourFormatter: string;
    __user__: {
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
        if (modifiers.available && !modifiers.disabled) {
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

        API.get<Appointment[]>('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then(response => {
            const appointmentsFormatter = response.data.map(appointment => {
                return {
                    ...appointment,
                    hourFormatter: format(parseISO(appointment.date), 'hh:mm'),
                }
            });

            console.log(appointmentsFormatter);

            setAppointments(appointmentsFormatter);
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

    const morningAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() < 12;
        });
    }, [appointments]);

    const afternoonAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            return parseISO(appointment.date).getHours() >= 12;
        });
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        return appointments.find(appointment =>
            isAfter(parseISO(appointment.date), new Date()));

    }, [selectedDate, appointments]);

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
                            <Link to="/profile">
                                <strong>{user.name}</strong>
                            </Link>
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
                    {
                        isToday(selectedDate) && nextAppointment && (

                            <NextAppontment>
                                <strong>Atendimento a seguir</strong>
                                <div>
                                    <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4"
                                        alt={nextAppointment.__user__.name} />

                                    <strong>{nextAppointment.__user__.name}</strong>
                                    <span>
                                        <FiClock />
                                        {nextAppointment.hourFormatter}
                                    </span>
                                </div>
                            </NextAppontment>

                        )
                    }
                    <Section>
                        <strong>Manhã</strong>
                        {morningAppointments.length === 0 && (
                            <p>Nenhum Agendamento neste período</p>
                        )}
                        {
                            morningAppointments.map(appointment => (
                                < Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {appointment.hourFormatter}
                                    </span>
                                    <div>
                                        <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4"
                                            alt={appointment.__user__.name} />

                                        <strong>{appointment.__user__.name}</strong>
                                    </div>
                                </Appointment>
                            ))
                        }
                    </Section>

                    <Section>
                        <strong>Tarde</strong>

                        {afternoonAppointments.length === 0 && (
                            <p>Nenhum Agendamento neste período</p>
                        )}

                        {
                            afternoonAppointments.map(appointment => (
                                < Appointment key={appointment.id}>
                                    <span>
                                        <FiClock />
                                        {appointment.hourFormatter}
                                    </span>
                                    <div>
                                        <img src="https://avatars3.githubusercontent.com/u/625433?s=460&u=102d383629d476e2c6817a204435a141bb895cf9&v=4"
                                            alt={appointment.__user__.name} />
                                        <strong>{appointment.__user__.name}</strong>
                                    </div>
                                </Appointment>
                            ))
                        }
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
        </Container >


    );
};

export default Dashboard;
