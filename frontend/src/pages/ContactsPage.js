import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from '../components/ContactForm';

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`/api/contacts?page=${page}&search=${search}`);
                setContacts(response.data.contacts);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Failed to fetch contacts:', error);
            }
        };
        fetchContacts();
    }, [page, search]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    };

    const handleSave = async () => {
        setSelectedContact(null);
        try {
            const response = await axios.get(`/api/contacts?page=${page}&search=${search}`);
            setContacts(response.data.contacts);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Contacts"
            />
            <button onClick={() => setSelectedContact(null)}>Add New Contact</button>
            {selectedContact && (
                <ContactForm contact={selectedContact} onSave={handleSave} />
            )}
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        <h3>{contact.firstName} {contact.lastName}</h3>
                        <p>{contact.address}</p>
                        <p>{contact.company}</p>
                        <p>{contact.phone}</p>
                        <button onClick={() => setSelectedContact(contact)}>Edit</button>
                        <button onClick={() => handleDelete(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPage(index + 1)}
                        disabled={page === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Contacts;
