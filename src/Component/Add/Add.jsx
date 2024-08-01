import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { db, collection, addDoc } from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function Add() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const contactsCollection = collection(db, 'contacts'); // Reference to 'contacts' collection

      await addDoc(contactsCollection, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        company: company
      });

      // Clear the form after successful submission
      setName('');
      setEmail('');
      setPhoneNumber('');
      setCompany('');


      alert('Contact added successfully!');
      navigate('/')
    } catch (error) {
      console.error('Error adding document: ', error);

      alert('Failed to add contact. Please try again later.');
    }
  };

  return (
    <div className='col-10 p-5'>
      <Form onSubmit={handleSubmit}>
        <div className='heading pb-3'>
          <h4>
            Create Contacts
          </h4>
        </div>
        <div className='rounded-circle profile-img'>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
          <button variant="primary" className='rounded-circle img-add'>+</button>
        </div>
        {/* Your form inputs */}
        <Form.Group className="mb-3 wraper p-2" controlId="formBasicName">
          <i className="fa-solid fa-user"></i> <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicEmail">
          <i className="fa-solid fa-envelope"></i> <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicNumber">
          <i className="fa-solid fa-phone"></i><Form.Control type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" required />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicCompany">
          <i className="fa-solid fa-building"></i> <Form.Control type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter Company" required />
        </Form.Group>

        <Button variant="primary" className='rounded-pill px-3' type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default Add;
