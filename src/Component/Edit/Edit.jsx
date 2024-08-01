import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { doc, getDoc, updateDoc, db } from '../../Firebase';
function Edit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'contacts', id));
        if (contactDoc.exists()) {
          const data = contactDoc.data();
          setName(data.name);
          setEmail(data.email);
          setPhoneNumber(data.phoneNumber);
          setCompany(data.company);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, {
        name,
        email,
        phoneNumber,
        company
      });
      console.log('Document successfully updated!');
      // Redirect or show success message
      navigate('/')
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className='col-10 p-5'>
      <Form onSubmit={handleSubmit}>
        <div className='heading pb-3'>
          <h4> Update Contact</h4>
        </div>
        <div className='rounded-circle profile-img'>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
          <button variant="primary" className='rounded-circle img-add'>+</button>
        </div>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicName">
          <i className="fa-solid fa-user"></i>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicEmail">
          <i className="fa-solid fa-envelope"></i>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicNumber">
          <i className="fa-solid fa-phone"></i>
          <Form.Control
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 wraper p-2" controlId="formBasicCompany">
          <i className="fa-solid fa-building"></i>
          <Form.Control
            type="text"
            placeholder="Enter Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" className='rounded-pill px-3' type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Edit;
