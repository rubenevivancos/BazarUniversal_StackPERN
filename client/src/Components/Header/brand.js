import React from 'react';
import { Navbar, Image } from 'react-bootstrap';
import logo from '../../Images/libreMercado_Logo.png';
import title from '../../Images/libreMercado_Letras.png';

const Brand = () => {
  return (
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
  );
};

export default Brand;