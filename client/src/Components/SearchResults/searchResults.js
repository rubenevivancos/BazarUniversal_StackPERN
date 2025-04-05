import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader.js';
import Product from "../Product/product.js";
import GoBack from '../GoBack/goBack';


export default function SearchResults() {

    const [product, setProduct] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setProduct(e.target.value);        
    }

    const listProducts = useSelector((state) => state.productReducer.listProduct);
    const productToSearch = useSelector((state) => state.productReducer.productToSearch);


    if(listProducts.length){
        return(
            <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#fdfd96', minHeight: '100vh' }}>
                <Container fluid>
                    <Row className="mb-2">
                        <MainHeader/>
                    </Row>
                    <Row>
                        <Container className="w-75">
                            <Row className="mb-2">
                                <GoBack/>
                            </Row>
                            <Row>
                                {listProducts.length > 0 ? (
                                    <>
                                        <Col md={3}>
                                            <Row className="mb-4 justify-content-left">
                                                <Col xs={12} md={10} className="text-left">
                                                    <div><b><h1>{productToSearch}</h1></b><br/>{listProducts.length} resultados</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <Row>
                                                <Col className="text-left">
                                                    <div>
                                                        { listProducts.map( product => (
                                                            <div key={product.id} style={{ marginBottom: '4rem' }}>
                                                                <Link 
                                                                    to={"/items/"+product.id} 
                                                                    key={product.id}
                                                                    className="text-decoration-none"
                                                                >
                                                                    <Product product={product}/>
                                                                </Link>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={3}>
                                            <Row>
                                                <Col className="text-end">
                                                    Ordenar por
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                ) : (
                                    <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                                        <h2>Loading...</h2>
                                    </Col>
                                )}
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </div>
        )
    }
}