import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Image } from 'react-bootstrap';

import { productSearch } from "../../Redux/Actions/productAction";
import logo from '../../Images/libreMercado_Logo.png';
import title from '../../Images/libreMercado_Letras.png';


const MainHeader = () => {

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
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', backgroundColor: '#f8c146' }}>
    <Navbar className="w-75">
      <Container>
        {/* Logo y título */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Image
            src={logo}
            alt="Logo"
            height={50}
            className="me-2" // Espaciado entre imágenes
          />
          <Image
            src={title}
            alt="Title"
            height={50}
          />
        </Navbar.Brand>

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

        {/* Menú horizontal */}
        <Nav className="ms-auto">
          <Nav.Link href="#categories">Categorías</Nav.Link>
          <Nav.Link href="#create-account">Crea tu cuenta</Nav.Link>
          <Nav.Link href="#login">Ingresa</Nav.Link>
          <Nav.Link href="#purchases">Mis compras</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>
  );
};

export default MainHeader;

