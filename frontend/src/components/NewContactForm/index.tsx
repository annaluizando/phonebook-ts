import { useEffect, useState, FormEvent } from "react";
import { MainButton } from '../MainButton/index';
import { ModalProps } from "../../types/ModalProps";
import useContacts from "@hooks/useContacts";

export const NewContactForm: React.FC<ModalProps> = ({ setModal, handleError }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { addContact } = useContacts();

    const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!firstName || !lastName || !phoneNumber) {
            handleError(new Error('All fields are required to add a contact.'), 'An unknown error occurred.');
            return;
        }

        try {
            await addContact({
                firstName,
                lastName,
                phoneNumber
            });

            setModal(false);
        } catch (error) {
            handleError(error, 'An unknown error occurred while adding the contact.');
        }
    };

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModal(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, []);

    return (
        <form onSubmit={handleAdd} className="grid justify-items-center gap-6">
            <h1 className="font-semibold text-4xl">Add a new contact</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white"
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white"
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white"
            />
            <MainButton text="Confirm" type="submit" />
        </form>
    );
};
