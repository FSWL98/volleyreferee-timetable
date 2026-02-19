import { type FC, type ReactNode } from 'react';
import closeIcon from '../../assets/Close.svg';
import './Modal.css';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <div className="modal__header">
                    <h3 className="modal__title">{title}</h3>
                    <button className="modal__close" onClick={onClose}>
                        <img src={closeIcon} alt='close' />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;