import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50`}>
            <div onClick={onClose} className="absolute inset-0 bg-black bg-opacity-50" />
            <div className={`relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10 fade-in`}>
                {children}
            </div>
        </div>
    );
};

export default Modal;