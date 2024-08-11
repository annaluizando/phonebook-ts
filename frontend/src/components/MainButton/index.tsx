import React from 'react';
import { MainButtonProps } from '../../types/MainButtonProps';

export const MainButton: React.FC<MainButtonProps> = ({
    type = "button",
    text, onclick,
    color = 'bg-blue-600',
    hoverColor = 'hover:bg-blue-500',
    outlineColor = 'active:bg-blue-700'
}) => (
    <button
        type={type}
        onClick={onclick}
        className={`py-2.5 px-5 rounded-lg ${color} text-white font-bold cursor-pointer ${hoverColor} focus:outline-none ${outlineColor}`}
    >
        {text}
    </button>
);