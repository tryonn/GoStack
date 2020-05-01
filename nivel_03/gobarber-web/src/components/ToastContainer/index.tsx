import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage } from '../../hook/Toast';

import { Container, Toast } from './styles';

interface ToastContainerProps {
    message: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ message }) => {
    return (
        <Container>
            {
                message.map(m => (

                    <Toast
                        key={m.id}
                        type={m.type}
                        hasDescription={!!m.description}
                    >
                        <FiAlertCircle size={20} />
                        <div>
                            <strong>{m.title}</strong>
                            {m.description && <p>{m.description}</p> }
                        </div>

                        <button type="button">
                            <FiXCircle size={18} />
                        </button>
                    </Toast>

                ))
            }
        </Container>
    )
};

export default ToastContainer;
