import React from 'react';
import { useTransition } from 'react-spring'
import { ToastMessage, useToast } from '../../hook/Toast';
import Toast from '../../components/ToastContainer/Toast';

import { Container } from './styles';

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

    const { removeToast } = useToast();
    const messagesWithTransitions = useTransition(
        messages,
        (message) => message.id,
        {
            from: { right: '-120%', opacity: 0, },
            enter: { right: '0%', opacity: 1, },
            leave: { right: '-120%', opacity: 0, },
        }
    );

    return (
        <Container>
            {
                messagesWithTransitions.map(({ item, key, props }) => ( <Toast style={props} key={key} m={item} />))
            }
        </Container>
    )
};

export default ToastContainer;
