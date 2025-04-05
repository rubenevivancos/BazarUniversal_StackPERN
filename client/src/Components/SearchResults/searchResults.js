import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation  } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';


import { productSearch } from "../../Redux/Actions/productAction";
import MainHeader from '../Header/mainHeader.js';
import Product from "../Product/product.js";
import GoBack from '../GoBack/goBack';


export default function SearchResults() {

    const dispatch = useDispatch();

    const { listProduct } = useSelector((state) => state.productReducer);

    const location = useLocation();

    // Obtener el query string de la URL
    const queryParams = new URLSearchParams(location.search);
    const productToSearch = queryParams.get("search");

    useEffect(() => {
        if (productToSearch) {
            dispatch(productSearch(productToSearch));
        }
    }, [dispatch, productToSearch]);


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
                                {listProduct.length > 0 ? (
                                    <>
                                        <Col md={3}>
                                            <Row className="mb-4 justify-content-left">
                                                <Col xs={12} md={10} className="text-left">
                                                    <div><b><h1>{productToSearch}</h1></b><br/>{listProduct.length} resultados</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={6}>
                                            <Row>
                                                <Col className="text-left">
                                                    <div>
                                                        { listProduct.map( product => (
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