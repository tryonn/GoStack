import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo,} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hook/Toast';

import { Container } from './styles';


interface ToastProps {
    m: ToastMessage;
}


const icons = {
    info: <FiInfo size={20}/>,
    error: <FiAlertCircle size={20}/>,
    success: <FiCheckCircle size={20}/>
};


const Toast: React.FC<ToastProps> = ({ m }) => {

    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(m.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };

    }, [removeToast, m.id]);

    return (
        <Container type={m.type} hasDescription={!!m.description}>
            {icons[m.type || 'info']};
            <div>
                <strong>{m.title}</strong>
                {m.description && <p>{m.description}</p>}
            </div>

            <button type="button" onClick={() => removeToast(m.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    );
}


export default Toast;


