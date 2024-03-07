import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, InputGroup, FormControl } from 'react-bootstrap';


import { getProductDetail } from "../../Redux/Actions/productAction";
import imagen from '../../Images/carrito.png';
import lupaIcon from '../../Images/lupa.png';
import CalificacionEstrellas from '../Product/stars';


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
            <Container fluid className="py-4 overflow-auto" style={{ maxHeight: '90vh', maxWidth: '50vh' }}>
                <Row className="mb-4 justify-content-left align-items-left">
                    <Col xs={12} md={10}>
                        <InputGroup>
                            <Image src={imagen} style={{ width: "50px" }}/>
                            <InputGroup.Text> </InputGroup.Text>
                            <FormControl
                                placeholder="smartphones, laptops..."
                                aria-label="Búsqueda"
                                aria-describedby="basic-addon2"
                                onChange={handleInput}
                            />
                            <Image src={lupaIcon} alt="Lupa"/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-4">
                    {/* Columna para la imagen */}
                    <Col className="d-flex justify-content-center align-items-center">
                        <Image src={selectedImage || product.images[0]} alt={product.title} className="img-fluid"/>
                    </Col>
                    {/* Columna para el carrusel de imagenes */}
                    <Col className="d-flex flex-column align-items-start overflow-auto" style={{ maxHeight: '50vh' }}>
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
                <Row className="mb-2">
                    <Col className="d-flex justify-content-center align-items-center">
                        <h4>{product.title} - {product.brand}</h4>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <h4>{product.price}$</h4>
                        <h6>{product.stock} disponibles</h6>
                    </Col>
                    <Col className="d-flex justify-content-center align-items-center">
                        <CalificacionEstrellas calificacion={product.rating} />
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <h6>{product.description}</h6>
                    </Col>
                </Row>
            </Container>
        )
    }else{
        return <div>Loading...</div>;
    }
}