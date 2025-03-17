import React from "react";
import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { loginUser } from "../../Redux/Actions/userAction";
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const user = await loginUser(email, password);
        console.log("Usuario autenticado:", user);
        // Aquí iría la llamada al backend para validar en PostgreSQL
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
                                <Row>
                                    <Col>
                                        <form onSubmit={handleLogin}>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                                            {error && <p>{error}</p>}
                                            <button type="submit">Iniciar sesión</button>
                                        </form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    )
}