import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormControl, Button, Nav, Row, Col } from 'react-bootstrap';
import { productSearch } from "../../Redux/Actions/productAction";

const SearchAndNav = () => {
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

    return (
        <div className="d-flex justify-content-between w-100">
                <Row className="w-100">
                    <Col>
                        {/* Caja de búsqueda */}
                        <Form className="d-flex ms-auto me-3" style={{ flexGrow: 1 }}>
                            <FormControl
                                type="search"
                                placeholder="Buscar productos, marcas y más..."
                                className="me-2 w-100"
                                aria-label="Search"
                                onChange={handleInput}
                            />
                            <Button variant="primary" onClick={handleSubmit}>Buscar</Button>
                        </Form>
                    </Col>
                    <Col>
                        {/* Menú horizontal */}
                        <Nav className="ms-auto">
                            <Link to="#categories" className="nav-link">Categorías</Link>
                            <Link to="/signUp" className="nav-link">Crea tu cuenta</Link>
                            <Link to="/logIn" className="nav-link">Ingresa</Link>
                            <Link to="#purchases" className="nav-link">Mis compras</Link>
                        </Nav>
                    </Col>
                </Row>
        </div>
    );
};

export default SearchAndNav;
