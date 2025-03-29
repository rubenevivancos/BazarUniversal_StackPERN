import React, { useEffect, useState, useRef }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';


import MainHeader from '../Header/mainHeader';
import { getProductDetail, clearProductDetail } from "../../Redux/Actions/productAction";
import CalificacionEstrellas from '../Product/stars';
import GoBack from '../GoBack/goBack';


export default function ProductDetail() {

    const [selectedImage, setSelectedImage] = useState("");
    const product = useSelector((state) => state.productReducer.productDetail);
    const isBuying = useRef(false); //Flag to prevent product details from being eliminated if they are being purchased.
    const navigate = useNavigate();

    const dispatch = useDispatch();
    let { id } = useParams();
    

    useEffect(() => {
        dispatch(getProductDetail(id));

        //Cleaning the product details
        return () => {
            if (!isBuying.current) {
                dispatch(clearProductDetail());
            }
        };
    }, [dispatch, id]);


    const handleBuyNow = (e) => {
        e.preventDefault();
        isBuying.current = true;
        navigate("/deliveryMethod");
    };
    

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
                            {
                                product && Object.keys(product).length > 0 ? (
                                    <>
                                <Col md={9}>
                                    <Row className="mb-4">
                                        {/* Columna para el carrusel de imagenes */}
                                        <Col md={4} className="d-flex flex-column justify-content-center align-items-end">
                                            {product.Images.map((image, index) => (
                                                <Image 
                                                    key={index} 
                                                    src={image.url} 
                                                    className="img-fluid mt-2 mb-2" 
                                                    style={{ 
                                                        maxHeight: '10vh',
                                                        border: selectedImage === image.url || selectedImage == "" && index === 0 ? '2px solid blue' : 'none' // Aplicar borde azul a la imagen seleccionada
                                                    }}
                                                    onMouseEnter={() => setSelectedImage(image.url)}
                                                />
                                            ))}
                                        </Col>
                                        {/* Columna para la imagen */}
                                        <Col md={8} className="d-flex justify-content-center align-items-center">
                                            <Image src={selectedImage || product.Images[0].url} alt={product.title} className="img-fluid" style={{ height: '60vh', objectFit: 'contain' }}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={3} className="d-flex flex-column flex-wrap justify-content-center">
                                    <Row className="mb-4">
                                        <Col className="d-flex flex-column flex-wrap justify-content-start align-items-start">
                                            <h5>{product.title} - {product.brand}</h5>
                                            <div className="d-flex justify-content-center align-items-center">
                                                <CalificacionEstrellas calificacion={product.rating} />
                                            </div>
                                            <h4>{product.price}$</h4>
                                            <h6>{product.stock} disponibles</h6>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <h6>{product.description}</h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center">
                                            <Button variant="primary" onClick={handleBuyNow} className="w-100">Comprar ahora</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="text-center text-primary">
                                            Agregar al carrito
                                        </Col>
                                    </Row>
                                </Col>
                                </>
                                ) : (
                                    <Col className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                                        <h2>Loading...</h2>
                                    </Col>
                                )
                            }
                            </Row>
                        </Container>
                    </Row>
                </Container>
            </div>
        )
}