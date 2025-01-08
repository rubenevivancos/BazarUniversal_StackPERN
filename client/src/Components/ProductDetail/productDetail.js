import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';


import MainHeader from '../MainHeader/mainHeader';
import { getProductDetail } from "../../Redux/Actions/productAction";
import imagen from '../../Images/libreMercado.png';
import lupaIcon from '../../Images/lupa.png';
import CalificacionEstrellas from '../Product/stars';
import GoBack from '../GoBack/goBack';


export default function ProductDetail() {

    const [productToSearch, setProductToSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const product = useSelector((state) => state.productReducer.productDetail);
    

    const handleInput = (e) => {
        e.preventDefault();
        setProductToSearch(e.target.value);        
    }

    const dispatch = useDispatch();
    let { id } = useParams();
    

    useEffect(() => {
        dispatch(getProductDetail(id));
    }, [dispatch, id]);
    

    if(product !== null){
        return(
            <div className="d-flex justify-content-center align-items-start" style={{ backgroundColor: '#fdfd96' }}>
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
                                <Col md={4}>
                                    <Row className="mb-4">
                                        {/* Columna para la imagen */}
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <Image src={selectedImage || product.images[0]} alt={product.title} className="img-fluid"/>
                                        </Col>
                                        {/* Columna para el carrusel de imagenes */}
                                        <Col className="d-flex flex-column align-items-start">
                                            {product.images.map((image, index) => (
                                                <Image 
                                                    key={index} 
                                                    src={image} 
                                                    className="img-fluid mt-2 mb-2" 
                                                    style={{ 
                                                        maxHeight: '20vh',
                                                        border: selectedImage === image || selectedImage == "" && index === 0 ? '2px solid blue' : 'none' // Aplicar borde azul a la imagen seleccionada
                                                    }}
                                                    onClick={() => setSelectedImage(image)}
                                                />
                                            ))}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row className="mb-2">
                                        <Col className="d-flex flex-wrap justify-content-center align-items-center">
                                            <h4>{product.title}</h4> <h4>-</h4> <h4>{product.brand}</h4>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col className="d-flex flex-wrap justify-content-center">                    
                                            <div className="d-flex flex-column justify-content-center align-items-center me-4">
                                                <h4>{product.price}$</h4>
                                                <h6>{product.stock} disponibles</h6>
                                            </div>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <CalificacionEstrellas calificacion={product.rating} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <h6>{product.description}</h6>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Col className="text-end">
                                            Comprar ahora
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-end">
                                            Agregar al carrito
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </div>
        )
    }else{
        return <div>Loading...</div>;
    }
}