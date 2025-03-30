import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import GoBack from '../GoBack/goBack';


export default function SuccessfulPayment() {

    const storedUser = localStorage.getItem("user");
    const user = useSelector((state) => state.userReducer.user) || (storedUser ? JSON.parse(storedUser) : null);
    console.log("user --> " + user);

    return(
        <Container fluid style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
            <Row className="mb-2">
                <MainHeader/>
            </Row>
            <Row className="mb-2">
                <Container className="w-75">
                    <Row className="mb-4">
                        <GoBack/>
                    </Row>
                    <Row>
                        FELICIDADES {user.name}, TU PAGO FUE EXITOSO
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}