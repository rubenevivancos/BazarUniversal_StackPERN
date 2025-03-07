import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { signUp } from '../../Redux/Actions/userAction';
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const errorFromStore = useSelector((state) => state.userReducer.error);
  const successFromStore = useSelector((state) => state.userReducer.success);
  
  useEffect(() => {
    setError(errorFromStore);
  }, [errorFromStore]);
  
  useEffect(() => {
    setSuccess(successFromStore);
  }, [successFromStore]);


  // Manejar el registro de usuario
  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');


    dispatch(signUp(name, email, password));
  };

  return (
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
                            <h3 className="text-center mb-4">Crea tu Cuenta</h3>
                            <Form onSubmit={handleSignUp}>
                                {/* Mostrar error si ocurre algún problema */}
                                {error && <Alert variant="danger">{error}</Alert>}

                                {/* Mostrar éxito si se registra correctamente */}
                                {success && <Alert variant="success">{success}</Alert>}

                                {/* Campo de nombre */}
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Introduce tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

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

                                {/* Botón de registro */}
                                <Button variant="primary" type="submit" className="mt-3">
                                    Crear Cuenta
                                </Button>

                                {/* Enlace a la página de login si el usuario ya tiene cuenta */}
                                <div className="mt-3 text-center">
                                    <small>
                                        ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
                                    </small>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    </div>
  );
};

export default SignUp;
