import React from "react";
import { Container, Row } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import GoBack from '../GoBack/goBack';


export default function DeliveryMethod() { 

        return(
            <Container fluid className="border border-primary border-4" style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
                <Row className="mb-2 border border-dark border-4">
                    <MainHeader/>
                </Row>
                <Row className="mb-2 border border-dark border-4">
                    <Container className="w-75 border border-primary border-4">
                        <Row className="mb-2 border border-dark border-4">
                            <GoBack/>
                        </Row>
                        <Row>
                                
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
}