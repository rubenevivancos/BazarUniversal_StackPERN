import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';


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
                        <Row className="mb-4 border border-dark border-5">
                            <GoBack/>
                        </Row>
                        <Row className="border border-dark border-4">
                            <Col className="border border-primary border-4">
                                <Row className="mb-4">
                                    <h5>Elige la forma de entrega</h5>
                                </Row>
                                <Row className="mb-4">
                                    <Col className="d-flex flex-column">
                                        <span>Enviar a domicilio</span>
                                        <span>Urb El Cuadro E - 87</span>
                                    </Col>
                                    <Col className="text-end text-success">
                                        <h6>Gratis</h6>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col className="d-flex flex-column">                                        
                                        <span>Retirar en el domicilio del vendedor</span>
                                        <span>La Victoria, Lima Metropolitana</span>
                                    </Col>
                                    <Col className="text-end text-success">
                                        <h6>Gratis</h6>
                                    </Col>
                                </Row>
                                <Row className="justify-content-end">
                                    <Button variant="primary" className="w-auto">Continuar</Button>
                                </Row>
                            </Col>
                            <Col className="border border-primary border-4">
                                <Row className="mt-2 mb-4">
                                    <h6>Resumen de compra</h6>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                        Producto
                                    </Col>
                                    <Col>
                                        S/67
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Pagas
                                    </Col>
                                    <Col>
                                        S/67
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
}