import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

import Brand from "./brand";
import SearchAndNav from "./searchAndNav";


const MainHeader = () => {

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

