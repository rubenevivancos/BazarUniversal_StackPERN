import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

import { signUp, clearUserMessages } from '../../Redux/Actions/userAction';
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';
import SuccessToast from './successToast';


const SignUp = () => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
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
        setShowToast(true);
        setTimeout(() => {
            dispatch(clearUserMessages()); // Borra los mensajes antes de redirigir
            navigate("/logIn");
          }, 3000);
      }
  }, [successFromStore, navigate]);


  // Manejar el registro de usuario
  const handleSignUp = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    

    dispatch(signUp(name, email, password, { address, city, postalCode }));
  };

  return (
        <Container fluid style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
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
                            <Form onSubmit={handleSignUp} className="w-25 mx-auto">
                                {/* Mostrar error si ocurre algún problema */}
                                {error && <Alert variant="danger">{error}</Alert>}

                                {/* Mostrar éxito si se registra correctamente */}
                                <SuccessToast show={showToast} onClose={() => setShowToast(false)} message={successFromStore} />

                                {/* Campo de nombre */}
                                <Form.Group controlId="formName" className="mb-4">
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
                                <Form.Group controlId="formEmail" className="mb-4">
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
                                <Form.Group controlId="formPassword" className="mb-4">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Introduce tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Campo de Dirección */}
                                <Form.Group controlId="formAddress" className="mb-4">
                                    <Form.Label>Dirección</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Ejemplo: Av. Siempre Viva 742"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    />
                                </Form.Group>

                                {/* Campo de Ciudad */}
                                <Form.Group controlId="formCity" className="mb-4">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Introduce tu ciudad"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    />
                                </Form.Group>

                                {/* Campo de Código Postal */}
                                <Form.Group controlId="formPostalCode" className="mb-4">
                                    <Form.Label>Código Postal</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Ejemplo: 15001"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    />
                                </Form.Group>

                                {/* Botón de registro */}
                                <div className="d-flex justify-content-center mt-5">
                                    <Button variant="primary" type="submit">
                                        Crear Cuenta
                                    </Button>
                                </div>

                                {/* Enlace a la página de login si el usuario ya tiene cuenta */}
                                <div className="mt-3 text-center">
                                    <small>
                                        ¿Ya tienes cuenta? <Link to="/logIn">Iniciar sesión</Link>
                                    </small>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
  );
};

export default SignUp;
