export type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface ContactCardProps extends Contact {
    onEditPress: () => void;
    handleError: (error: unknown, defaultMessage: string) => void;
}