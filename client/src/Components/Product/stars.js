import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Row, Col } from 'react-bootstrap';


function CalificacionEstrellas({ calificacion }) {
    const renderEstrellas = () => {
        const estrellas = [];
        const entero = Math.floor(calificacion);
        const decimal = calificacion - entero;

        for (let i = 0; i < entero; i++) {
            estrellas.push(<BsStarFill key={i} />);
        }

        if (decimal >= 0.5) {
            estrellas.push(<BsStarHalf key={entero} />);
        }

        const estrellasFaltantes = 5 - estrellas.length;
        for (let i = 0; i < estrellasFaltantes; i++) {
            estrellas.push(<BsStar key={5 - i} />);
        }

        return estrellas;
    };

    return (
        <div>
            <Row>
                <Col className="d-flex align-items-center">
                    <span>{calificacion}</span>
                    <span className="ms-2 d-flex align-items-center">
                        {renderEstrellas().map((estrella, index) => (
                            <span key={index} className="d-flex align-items-center">{estrella}</span>
                        ))}
                    </span>
                </Col>
            </Row>
        </div>
    );
}

export default CalificacionEstrellas;