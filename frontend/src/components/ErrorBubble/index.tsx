import React from 'react';
import { ErrorBubbleProps } from '../../types/ErrorBubbleProps';
import alertIcon from '@assets/error-alert.svg';

export const ErrorBubble: React.FC<ErrorBubbleProps> = ({ message }) => {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
            <div className="flex align-center items-center">
                <div className="py-1">
                    <img src={alertIcon} alt='error' className='w-7 h-7' />
                </div>
                <div className="ml-3">
                    <p className="font-bold text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};