import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormControl, Button, Nav, Row, Col } from 'react-bootstrap';
import { logoutUser, clearUserMessages } from "../../Redux/Actions/userAction";
import { BsSearch } from 'react-icons/bs';


const SearchAndNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.userReducer.user);
    const [product, setProduct] = useState("");


    const handleInput = (e) => setProduct(e.target.value);


    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/items?search=${product}`);
    }

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logoutUser()); 
        dispatch(clearUserMessages());
        navigate("/"); 
    };

    const renderLoggedOutLinks = () => (
        <>
            <Link to="/signUp" className="nav-link">Crea tu cuenta</Link>
            <Link to="/logIn" className="nav-link">Ingresa</Link>
        </>
    );

    const renderLoggedInLinks = () => (
        <>
            <Link to="#purchases" className="nav-link">Mis compras</Link>
            <Link to="/" onClick={handleLogout} className="nav-link">Cerrar Sesión</Link>
            <div className="text-start me-3">
                <span className="d-block">Bienvenido/a</span>
                <strong>{user.name}</strong>
            </div>
        </>
    );

    return (
        <div className="d-flex justify-content-between w-100">
                <Row className="w-100">
                    <Col>
                        {/* Caja de búsqueda */}
                        <Form className="d-flex ms-auto me-3" onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                            <FormControl
                                type="search"
                                placeholder="Buscar productos, marcas y más..."
                                className="w-100"
                                aria-label="Search"
                                onChange={handleInput}
                            />
                            <Button type="submit" variant="light">
                                <BsSearch />
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        {/* Menú horizontal */}
                        <Nav className="ms-auto">
                            <Link to="#categories" className="nav-link">Categorías</Link>
                            {user ? renderLoggedInLinks() : renderLoggedOutLinks()}
                        </Nav>
                    </Col>
                </Row>
        </div>
    );
};

export default SearchAndNav;