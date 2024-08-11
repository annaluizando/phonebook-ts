export type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ContactCardProps extends Contact {
    onDelete: () => void;
    onEdit: () => void;
}