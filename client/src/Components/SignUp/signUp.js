import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebase';

import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Inicializar Firebase Auth
  const auth = getAuth(firebaseApp);
  console.log("auth ---> " + auth);

  // Manejar el registro de usuario
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Llamamos a Firebase Authentication para crear al usuario
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      alert('¡Cuenta creada con éxito!');
      // Redirigir a otra página o mostrar un mensaje de éxito aquí
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log("Error en la autenticacion ---> " + error);
    }
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
                                <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                                    {loading ? 'Registrando...' : 'Crear Cuenta'}
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
