import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, InputGroup, FormControl, Button } from 'react-bootstrap';

import { productSearch } from "../../Redux/Actions/productAction";
import imagen from '../../Images/carrito.png';
import lupaIcon from '../../Images/lupa.png';



export default function HomeWithSearchBox() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setProduct(e.target.value);        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(productSearch(product));

        // Crea una nueva ruta con el parámetro de consulta "search"
        const newRoute = `/items?search=${product}`;

        navigate(newRoute);
    }


    return(
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#fdfd96' }}>
            <Container className="py-4">
                <Row className="mb-4">
                    <Col className="d-flex justify-content-center">
                        <Image src={imagen} style={{ width: "200px" }}/>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col>
                        <h1 className="text-center">Bazar Universal</h1>
                    </Col>
                </Row>
                <Row className="mb-4 justify-content-center">
                    <Col className="d-flex justify-content-center">
                        <div style={{ width: '30%'}}>
                            <InputGroup>
                                <FormControl
                                    placeholder="smartphones, laptops..."
                                    aria-label="Búsqueda"
                                    aria-describedby="basic-addon2"
                                    onChange={handleInput}                                
                                />
                                <Image src={lupaIcon} alt="Lupa" />
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="primary" onClick={handleSubmit}>
                            Buscar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}