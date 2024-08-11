import { useEffect, useState } from 'react';
import phonebookIcon from '@assets/phonebook.svg';
import { Contact } from '../types/ContactProps';
import { SearchBar } from '@components/SearchBar/index';
import { MainButton } from '@components/MainButton/index';
import { ContactCard } from '@components/ContactCard/index';
import { NewContactForm } from '@components/NewContactForm/index';
import { EditContactForm } from '@components/EditContactForm';
import { ErrorBubble } from '@components/ErrorBubble';
import Modal from '@components/Modal';
import useContacts from '@hooks/useContacts';
import useErrorHandler from '@hooks/useErrorHandler';
import useModal from '@hooks/useModal';
import useDebounce from '@hooks/useDebonce';

export default function Home() {
    const { contacts, deleteContact } = useContacts();
    const { errorMessage, errorBubble, handleError } = useErrorHandler();
    const { isOpen: addContactModal, openModal: openAddContactModal, closeModal: closeAddContactModal } = useModal();
    const { isOpen: editContactModal, openModal: openEditContactModal, closeModal: closeEditContactModal } = useModal();
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const filteredContacts = contacts.filter(contact =>
        contact.lastName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    useEffect(() => {

    }, [contacts]);

    return (
        <>
            {errorBubble && (
                <div className='absolute top-4 left-1/2 -translate-x-1/2 z-[100]'>
                    {errorMessage && <ErrorBubble message={errorMessage} />}
                </div>
            )}

            {addContactModal && (
                <Modal onClose={closeAddContactModal}>
                    <NewContactForm
                        setModal={closeAddContactModal}
                        handleError={handleError}
                    />
                </Modal>
            )}

            {editContactModal && selectedContact && (
                <Modal onClose={closeEditContactModal}>
                    <EditContactForm
                        setModal={closeEditContactModal}
                        id={selectedContact.id}
                        firstName={selectedContact.firstName}
                        lastName={selectedContact.lastName}
                        phoneNumber={selectedContact.phoneNumber}
                        handleError={handleError}
                    />
                </Modal>
            )}

            <div className="grid gap-14">
                <header className="App-header">
                    <div className="flex items-center flex-wrap justify-center">
                        <img src={phonebookIcon} className="w-[52px] h-[52px]" alt="phonebook icon" />
                        <h1 className="ml-2 font-semibold">Phone Book App</h1>
                    </div>
                </header>
                <main className="w-full m-0 p-0 grid gap-4">
                    <div className="flex justify-between w-full items-center">
                        <h3 className="font-semibold text-2xl">Contacts</h3>
                        <MainButton text="+ Add Contact" onclick={openAddContactModal} />
                    </div>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    {filteredContacts.length > 0 ? (
                        <ul className="list-none">
                            {filteredContacts.map(contact => (
                                <li key={contact.id}>
                                    <ContactCard
                                        firstName={contact.firstName}
                                        lastName={contact.lastName}
                                        phoneNumber={contact.phoneNumber}
                                        id={contact.id}
                                        onDelete={() => deleteContact(contact.id)}
                                        onEdit={() => {
                                            setSelectedContact(contact);
                                            openEditContactModal();
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="h-56 flex items-center justify-center">
                            <p className="text-xl ">No contacts found :(</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}