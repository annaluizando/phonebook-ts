import trashIcon from '@assets/trash.svg';
import phoneIcon from '@assets/phone.svg';
import pencilIcon from '@assets/pencil.svg';
import { ContactCardProps } from '../../types/ContactProps';
import React from 'react';
import useContacts from '@hooks/useContacts';

export const ContactCard: React.FC<ContactCardProps> = ({ id, firstName, lastName, phoneNumber, onEditPress, handleError }) => {
    const { deleteContact } = useContacts();

    const handleDelete = async () => {
        try {
            await deleteContact(id);
        } catch (error) {
            handleError(error, 'An unknown error occurred while deleting the contact.');
        }
    };

    return (
        <>
            <div
                className="flex flex-wrap items-center justify-between w-full max-w-[1000px] p-4 h-auto bg-white border border-[#d9d9d9] rounded-sm text-base transition-colors duration-300"
            >

                <div className="flex-1">

                    <div className='grid justify-items-start'>
                        <p>
                            {firstName} {lastName}
                        </p>
                        <div className="flex items-center gap-1">
                            <img src={phoneIcon} alt='phone-icon' className='w-4 h-4' draggable={false} />
                            <p>
                                {phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid gap-2'>
                    <button
                        className="rounded-md p-2 border-none bg-slate-500 hover:bg-slate-700 focus:outline-none active:bg-slate-800"
                        onClick={onEditPress}
                    >
                        <img src={pencilIcon} alt='edit' className='w-4 h-4' />
                    </button>

                    <button
                        className="rounded-md p-2 border-none bg-red-600 hover:bg-red-700 focus:outline-none active:bg-red-800"
                        onClick={handleDelete}
                    >
                        <img src={trashIcon} alt='delete' className='w-4 h-4' />
                    </button>
                </div>
            </div>
        </>
    );
};