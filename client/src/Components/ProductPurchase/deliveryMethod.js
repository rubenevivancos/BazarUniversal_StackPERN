import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button,Form } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import GoBack from '../GoBack/goBack';


export default function DeliveryMethod() {

    const [selectedOption, setSelectedOption] = useState("homeDelivery");

    const product = useSelector((state) => state.productReducer.productDetail);

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
                            <br/><br/><br/>
                        </Row>
                        <Row>
                            <Col className="me-5">
                                <Row className="mb-4">
                                    <h5>Elige la forma de entrega</h5>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <Row>
                                            <Col className="col-auto">
                                                <Form.Check 
                                                    type="radio" 
                                                    id="homeDelivery" 
                                                    name="deliveryMethod" 
                                                    checked={selectedOption === "homeDelivery"}
                                                    onChange={() => setSelectedOption("homeDelivery")}
                                                />
                                            </Col>
                                            <Col className="d-flex flex-column">
                                                <span>Enviar a domicilio</span>
                                                <span>Urb El Cuadro E - 87</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="text-end text-success">
                                        <h6>$/ {product.price}</h6>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        <Row>
                                            <Col className="col-auto">
                                                <Form.Check 
                                                    type="radio" 
                                                    id="sellerPickup" 
                                                    name="deliveryMethod" 
                                                    checked={selectedOption === "sellerPickup"}
                                                    onChange={() => setSelectedOption("sellerPickup")}
                                                />
                                            </Col>
                                            <Col className="d-flex flex-column">
                                                <span>Retirar en el domicilio del vendedor</span>
                                                <span>La Victoria, Lima Metropolitana</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="text-end text-success">
                                        <h6>Gratis</h6>
                                    </Col>
                                </Row>
                                <Row className="justify-content-end">
                                    <Button variant="primary" className="w-auto">Continuar</Button>
                                </Row>
                            </Col>
                            <Col className="ms-5">
                                <Row className="mt-2 mb-4">
                                    <h6>Resumen de compra</h6>
                                </Row>
                                <Row className="mb-1">
                                    <Col>
                                        Producto
                                    </Col>
                                    <Col>
                                        $/ {product.price}
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        Envío
                                    </Col>
                                    <Col>
                                        {selectedOption === "homeDelivery" ? "$/ 20" : "Gratis"}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Pagas
                                    </Col>
                                    <Col>
                                        {selectedOption === "homeDelivery" ? "S/87" : "S/67"}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
}