import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormControl, Button, Nav, Row, Col } from 'react-bootstrap';
import { productSearch } from "../../Redux/Actions/productAction";
import { logoutUser, clearUserMessages } from "../../Redux/Actions/userAction";

const SearchAndNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer.user);
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

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logoutUser()); 
        dispatch(clearUserMessages());
        navigate("/"); 
    };

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
                            {!user && (
                                <>
                                    <Link to="/signUp" className="nav-link">Crea tu cuenta</Link>
                                    <Link to="/logIn" className="nav-link">Ingresa</Link>
                                </>
                            )}
                            <Link to="#purchases" className="nav-link">Mis compras</Link>
                            {user && (
                                <>
                                    <Link to="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</Link>
                                    <div className="text-start me-3">
                                        <span className="d-block">Bienvenido</span>
                                        <strong>{user.name}</strong>
                                    </div>
                                </>
                            )}
                        </Nav>
                    </Col>
                </Row>
        </div>
    );
};

export default SearchAndNav;
