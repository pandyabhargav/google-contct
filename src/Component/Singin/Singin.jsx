import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Singin({ onUserPhoto }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('User signed up:', user);
            navigate('/login');
            localStorage.setItem('isUserSignedUp', true);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('User signed in with Google:', user);

            // Pass the user's photoURL to the parent component
            if (user.photoURL) {
                onUserPhoto(user.photoURL);
            }

            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className='signin col-12 signin-bg d-flex justify-content-center align-items-center'>
            <div className='col-6 p-5 bd bg-white1'>
                <div className='col-12'>
                    <img src="\image\google-logo-on-transparent-white-background-free-vector.jpg" alt="Google Logo" />
                </div>
                <div className='col-12 d-flex flex-wrap'>
                    <div className='col-6 p-3'>
                        <h1>Create a Google Account</h1>
                        <p>Enter Your Details</p>
                    </div>
                    <div className='col-6'>
                        <Form onSubmit={handleSignUp} className='col-12'>
                            <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className='m-0'
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email address"
                                    className='m-0'
                                />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className='m-0'
                                />
                            </FloatingLabel>
                            <div className='my-3 d-flex justify-content-between'>
                                <Button
                                    variant="primary"
                                    type="button"
                                    className='px-2'
                                    onClick={handleGoogleSignIn}
                                >
                                    <img src="\image\google-logo-on-transparent-white-background-free-vector.jpg" className='pe-2' alt="" />Sign in with Google
                                </Button>
                                <div>
                                    <Button variant="primary" as={Link} to="/login" className='rounded-pill bt px-3'>
                                        Log in
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className='rounded-pill px-3'
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Singin;
