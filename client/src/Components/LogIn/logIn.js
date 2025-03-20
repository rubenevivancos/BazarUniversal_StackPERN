import React from "react";
import { useState } from "react";
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../Redux/Actions/userAction";
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


export default function LogIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const user = await loginUser(email, password);
        console.log("Usuario autenticado:", user);
        navigate("/");
      } catch (err) {
        setError(err.message);
      }
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