import React from 'react';

import { ToastMessage, useToast } from '../../hook/Toast';
import Toast from '../../components/ToastContainer/Toast';

import { Container } from './styles';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const { removeToast } = useToast();

    return (
        <Container>
            {
                messages.map(m => (

                    <Toast
                        key={m.id}
                        m={m}
                    />

                ))
            }
        </Container>
    )
};

export default ToastContainer;
