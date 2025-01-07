import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';


import MainHeader from '../MainHeader/mainHeader';
import Product from "../Product/product.js";
import imagen from '../../Images/libreMercado.png';
import lupaIcon from '../../Images/lupa.png';
import GoBack from '../GoBack/goBack';


export default function SearchResults() {

    const [product, setProduct] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setProduct(e.target.value);        
    }

    const listProducts = useSelector((state) => state.productReducer.listProduct);
    const productToSearch = useSelector((state) => state.productReducer.productToSearch);
    const categoriesWithCount = useSelector((state) => state.productReducer.categoriesWithCount);

    function generateColor(category) {
        let color = "#";
        switch (category) {
            case "smartphones":
                color = "#FFC0CB"; //Rosado claro
                break;
            case "laptops":
                color = "#4285F4"; //Celeste
                break;
            case "fragrances":
                color = "#90EE90"; //Verde claro
                break;
            case "skincare":
                color = "#FFFF00"; //Amarillo
                break;
            case "groceries":
                color = "#800080"; //Morado
                break;
            case "home-decoration":
                color = "#D2B48C"; //Beige
                break;
            default:
              color = "#B0E0E6"; //Azul polvo
        }
        return color;
      }

    if(listProducts.length){
        return(
            <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#fdfd96' }}>
                <Container fluid>
                    <Row className="mb-2">
                        <MainHeader/>
                    </Row>   
                    <Row className="mb-2">
                        <GoBack/>
                    </Row>
                    <Row>
                        <Col>
                            <Row className="mb-4 justify-content-left">
                                <Col xs={12} md={10} className="text-left">
                                    <div>Resultados de la busqueda de " {productToSearch} ": {listProducts.length}</div>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col className="d-flex flex-wrap justify-content-start">
                                    {categoriesWithCount.map((cat, index) => (                            
                                        <span 
                                            key={index} 
                                            className="me-2 p-1 mb-1 rounded small fw-bold" 
                                            style={{ backgroundColor: generateColor(cat.category) }}
                                        >
                                            {cat.category} - {cat.count}
                                        </span>
                                    ))}
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col className="text-left">
                                    <div>
                                        { listProducts.map( product => <Link to={"/items/"+product.p_id} key={product.p_id} style={{ textDecoration: 'none' }}><Product product={product} /></Link>) }
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                Ordenar por
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}