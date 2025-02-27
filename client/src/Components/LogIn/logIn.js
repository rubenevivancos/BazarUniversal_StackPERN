import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import BrandHeader from '../Header/brandHeader';
import GoBack from '../GoBack/goBack';


export default function LogIn() {

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
                                        Hola
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