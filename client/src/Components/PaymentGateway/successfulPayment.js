import React, { useState, useMemo  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button,Form } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import GoBack from '../GoBack/goBack';
import { payWithThePaymentGateway } from "../../Redux/Actions/paymentAction";


export default function DeliveryMethod() {

    const user = useSelector((state) => state.userReducer.user);


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
                        FELICIDADES {user.name}, <span>TU PAGO FU EXITOSO</span>
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}