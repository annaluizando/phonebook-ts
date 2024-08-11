import { useEffect, useState } from "react";
import { ModalProps } from "../../types/ModalProps";
import { MainButton } from "../MainButton";
import useContacts from "@hooks/useContacts";

export const EditContactForm: React.FC<ModalProps> = ({
    setModal,
    id,
    firstName,
    lastName,
    phoneNumber,
    handleError
}) => {
    const [editedFirstName, setEditedFirstName] = useState(firstName);
    const [editedLastName, setEditedLastName] = useState(lastName);
    const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
    const { updateContact } = useContacts();

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!id) {
            handleError(new Error('Contact ID is required for updating the contact.'), 'An unknown error occurred.');
            return;
        }

        if (!editedFirstName || !editedLastName || !editedPhoneNumber) {
            handleError(new Error('All fields are required to update the contact.'), 'An unknown error occurred.');
            return;
        }

        try {
            await updateContact(id, {
                firstName: editedFirstName,
                lastName: editedLastName,
                phoneNumber: editedPhoneNumber,
            });
            setModal(false);
        } catch (error) {
            handleError(error, 'An unknown error occurred while updating the contact.');
        }
    };

    const handleCancel = () => {
        setEditedFirstName(firstName);
        setEditedLastName(lastName);
        setEditedPhoneNumber(phoneNumber);
        setModal(false);
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
    }, [setModal]);

    return (
        <form className="grid justify-items-center gap-6" onSubmit={handleSave}>
            <h1 className="font-semibold text-4xl">Edit contact</h1>
            <input
                type='text'
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
                placeholder="First Name"
                className="p-2 border border-gray-300 rounded-md bg-white"
            />
            <input
                type='text'
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
                placeholder="Last Name"
                className="p-2 border border-gray-300 rounded-md bg-white"
            />
            <input
                type='text'
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="p-2 border border-gray-300 rounded-md bg-white"
            />

            <div className="flex gap-2 justify-center">
                <MainButton
                    text="Save"
                    type="submit"
                />
                <MainButton
                    text="Cancel"
                    onclick={handleCancel}
                    color="bg-slate-600"
                    hoverColor="hover:bg-slate-700"
                    outlineColor="active:bg-slate-800"
                />
            </div>
        </form>
    );
};
