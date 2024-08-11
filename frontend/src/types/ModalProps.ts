export interface ModalProps {
    id?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    setModal: (value: boolean) => void;
    handleError: (error: unknown, defaultMessage: string) => void;
}
