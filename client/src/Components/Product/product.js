import { Container, Row, Col, Image } from 'react-bootstrap';
import CalificacionEstrellas from './stars';



export default function Product({product}) {


    return(
        <Container className="my-4"> {/* Agregamos my-4 para agregar margen arriba y abajo */}
            <Row className="align-items-center">
                {/* Columna para la imagen */}
                <Col xs={12} lg={5} className="mb-4 mb-lg-0">
                    <Image src={product.images[0]} alt={product.title} className="img-fluid" />
                </Col>
                {/* Columna para el contenido */}
                <Col xs={12} lg={7} className="text-dark">
                    <h2 className="font-weight-bold">{product.title}</h2>
                    <p>{product.description}</p>
                    <div className="d-flex align-items-center">
                        <span className="fw-bold me-4">$ {product.price}</span>
                        <CalificacionEstrellas calificacion={product.rating} />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}