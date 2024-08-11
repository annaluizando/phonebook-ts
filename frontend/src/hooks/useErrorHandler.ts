import { useState } from 'react';

const useErrorHandler = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [errorBubble, setErrorBubble] = useState(false);

    const showError = (message: string) => {
        setErrorMessage(message);
        setErrorBubble(true);
        setTimeout(() => {
            setErrorBubble(false);
            setErrorMessage('');
        }, 4200);
    };

    const handleError = (error: unknown, defaultMessage: string) => {
        if (error instanceof Error) {
            showError(error.message);
        } else {
            showError(defaultMessage);
        }
    };

    return { errorMessage, errorBubble, showError, handleError };
};

export default useErrorHandler;