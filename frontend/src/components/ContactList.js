import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('/api/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        {contact.firstName} {contact.lastName} - {contact.phoneNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
