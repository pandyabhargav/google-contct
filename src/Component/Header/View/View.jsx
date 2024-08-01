import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db, collection, getDocs, deleteDoc, doc } from '../../../Firebase';
import { useNavigate } from 'react-router-dom';

function View({ searchTerm }) {
    let navigate = useNavigate();

    useEffect(() => {
        const visited = localStorage.getItem('visited');

        if (!visited) {
            localStorage.setItem('visited', 'true');
            navigate('/singin');
        }
    }, [navigate]);

    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contacts'));

                const contactsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setContacts(contactsData);
                setFilteredContacts(contactsData); 
            } catch (error) {
                console.error('Error fetching contacts: ', error);
            }
        };

        fetchContacts();
    }, []);

    useEffect(() => {
        const results = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredContacts(results);
    }, [searchTerm, contacts]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts', id));
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
            setFilteredContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error removing document: ', error);
        }
    };

    return (
        <div className='col-10 p-5'>
            <div className='p-1 heading'>
                Contacts
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredContacts.map(contact => (
                        <tr key={contact.id}>
                            <td><img src="\image\contacts_2022_48dp.png" className='img-1 p-2 rounded-pill bt' alt="" /> {contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>{contact.company}</td>
                            <td>
                                <Link to={`/edit/${contact.id}`}>
                                    <Button className='mx-2 text-white'><i className="fa-solid fa-pen-to-square"></i></Button>
                                </Link>
                                <Button className='mx-2' onClick={() => handleDelete(contact.id)}><i className="fa-solid fa-trash"></i></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default View;
