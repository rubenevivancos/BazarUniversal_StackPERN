import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

import Brand from "./brand";


const BrandHeader = () => {

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', backgroundColor: '#f8c146' }}>
      <Navbar className="w-75">
        <Container>

          {/* Logo y título */}
          <Brand/>
          
        </Container>
      </Navbar>
    </div>
  );
};

export default BrandHeader;