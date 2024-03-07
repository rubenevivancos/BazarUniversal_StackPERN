import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';



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
            {renderEstrellas().map((estrella, index) => (
                <span key={index}>{estrella}</span>
            ))}
        </div>
    );
}

export default CalificacionEstrellas;