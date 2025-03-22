import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { loginUser, clearUserMessages } from "../../Redux/Actions/userAction";
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


export default function LogIn() {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const errorFromStore = useSelector((state) => state.userReducer.error);
    const successFromStore = useSelector((state) => state.userReducer.success);


    useEffect(() => {
        if (errorFromStore) setError(errorFromStore);
    }, [errorFromStore]);

    
    useEffect(() => {
        if (successFromStore) {
            setSuccess(successFromStore);
            dispatch(clearUserMessages()); // Borra los mensajes antes de redirigir
            navigate("/");
        }
    }, [successFromStore, navigate]);

  
    const handleLogin = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        dispatch(loginUser(email, password));
    };


    return(
        <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
            <Container fluid>
                <Row className="mb-2">
                    <BrandHeader/>
                </Row>
                <Row>
                    <Container className="w-75">
                        <Row className="mb-2">
                            <GoBack/>
                        </Row>
                        <Row>
                            <Col>
                                <h3 className="text-center mb-4">Ingresa</h3>
                                <Form onSubmit={handleLogin}>
                                    {/* Mostrar error si ocurre algún problema */}
                                    {error && <Alert variant="danger">{error}</Alert>}

                                    {/* Campo de email */}
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Correo electrónico</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Introduce tu correo"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    {/* Campo de contraseña */}
                                    <Form.Group controlId="formPassword" className="mt-3">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Introduce tu contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mt-3">
                                        Iniciar sesión
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    )
}