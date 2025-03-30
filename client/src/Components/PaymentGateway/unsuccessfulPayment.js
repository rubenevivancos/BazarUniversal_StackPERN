import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from 'react-bootstrap';
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
                    <Row className="mb-4">
                        <br></br>
                    </Row>
                    <Row>
                        LO SENTIMOS {user.name}, TU PAGO NO SE PUDO REALIZAR
                    </Row>
                    <Row className="justify-content-end">
                        <Button variant="primary" className="w-auto" onClick={goToHome}>Ir al inicio</Button>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}