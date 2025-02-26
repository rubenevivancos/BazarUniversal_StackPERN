import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button, Image } from 'react-bootstrap';

import { productSearch } from "../../Redux/Actions/productAction";
import Brand from "./brand";
import SearchAndNav from "./searchAndNav";


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
          <Brand/>

          {/* Caja de búsqueda y Menú horizontal */}
          <SearchAndNav />
          
        </Container>
      </Navbar>
    </div>
  );
};

export default MainHeader;

