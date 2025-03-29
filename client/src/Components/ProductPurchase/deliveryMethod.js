import React, { useState, useMemo  } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button,Form } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import GoBack from '../GoBack/goBack';


export default function DeliveryMethod() {

    const [selectedOption, setSelectedOption] = useState("homeDelivery");

    const product = useSelector((state) => state.productReducer.productDetail);
    const user = useSelector((state) => state.userReducer.user);

    const shippingCost = 20;

    //Function to calculate the total price
    const totalAmount = useMemo(() => {
        if (!product || !product.price) return (0).toFixed(2);
        const price = Number(product.price); // Asegurarse de que sea número
        return selectedOption === "homeDelivery"
            ? (price + shippingCost).toFixed(2)
            : price.toFixed(2);
    }, [selectedOption, product]);


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
                                                <span>{user.address}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="text-end text-success">
                                        <h6>$/ {Number(product?.price || 0).toFixed(2)}</h6>
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
                                        $/ {product?.price || 0}
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col>
                                        Envío
                                    </Col>
                                    <Col>
                                        {selectedOption === "homeDelivery" ? `$/ ${shippingCost.toFixed(2)}` : "Gratis"}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Pagas
                                    </Col>
                                    <Col>
                                        $/ {totalAmount}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
}