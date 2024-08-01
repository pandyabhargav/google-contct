import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth, googleProvider,signInWithPopup } from '../../Firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('User signed in:', user);
            navigate('/');
            
        } catch (error) {
            setError(error.message);
            console.error('Error signing in:', error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log('User signed in with Google:', user);

            navigate('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <div className='signin signin-bg col-12 d-flex justify-content-center align-items-center'>
            <div className='col-6 p-5 bd bg-white1'>
                <div className='col-12'>
                    <img src="\image\google-logo-on-transparent-white-background-free-vector.jpg" alt="Google Logo" />
                </div>
                <div className='col-12 d-flex flex-wrap'>
                    <div className='col-6 p-3'>
                        <h1>Log in</h1>
                        <p>Use your Google Account</p>
                    </div>
                    <div className='col-6'>
                        <Form onSubmit={handleSignIn} className='col-12'>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="name@example.com"
                                    className='m-0'
                                    required
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
                                    required
                                />
                            </FloatingLabel>
                            {error && <Form.Text className="text-danger">{error}</Form.Text>}
                            <div className='my-3 d-flex justify-content-between'>
                            <Button
                                    variant="primary"
                                    type="button"
                                    className='px-1'
                                    onClick={handleGoogleSignIn}
                                >
                                    <img src="\image\google-logo-on-transparent-white-background-free-vector.jpg" className='pe-2' alt="" />Login with Google
                                </Button>
                                <div>
                                <Button variant="primary" className='rounded-pill px-3 ms-1' type="submit">
                                    Log In
                                </Button>
                                {/* Optional: Redirect to signup page */}
                                <Button variant="primary" as={Link} to="/singin" className='rounded-pill bt px-3' type="button" onClick={() => { /* Add redirect logic */ }}>
                                    Create account
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

export default Login;
