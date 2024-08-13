import { Dispatch, SetStateAction } from "react";
import { Contact } from "./ContactProps";

export interface ModalProps {
    id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    setContacts: Dispatch<SetStateAction<Contact[]>>;
    setModal: (value: boolean) => void;
    handleError: (error: unknown, defaultMessage: string) => void;
}
