import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Button, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


import MainHeader from '../Header/mainHeader';


export default function UnsuccessfulPayment() {

    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = useSelector((state) => state.userReducer.user) || (storedUser ? JSON.parse(storedUser) : null);

    const goToHome = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return(
        <Container fluid style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
            <Row className="mb-2">
                <MainHeader/>
            </Row>
            <Row className="mb-2">
                <Container className="w-75">
                    <Row>
                        <Col className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                            <h2 className="mb-5">Lo sentimos {user.name}, tu pago no se pudo realizar</h2>
                            <Button variant="primary" className="w-auto mt-3" onClick={goToHome}>Ir al inicio</Button>
                        </Col>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}