import React from "react";
import { Carousel } from 'react-bootstrap';

import MainHeader from '../Header/mainHeader';
import laptopsImg from '../../Images/laptops.png';
import fragrancesImg from '../../Images/fragrances.png';
import smartphonesImg from '../../Images/smartphones.png';


export default function HomeWithSearchBox() {

    return(
        <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#fdfd96' }}>
            {/* MainHeader arriba */}
            <MainHeader />

            {/* Carrusel centrado */}
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <Carousel 
                    className="w-75"
                    interval={3000} // Intervalo de 3 segundos para el auto-play
                   
                >
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={laptopsImg}
                            alt="Laptops"
                            style={{ height: '400px', objectFit: 'contain' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={fragrancesImg}
                            alt="Fragrances"
                            style={{ height: '400px', objectFit: 'contain' }}
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={smartphonesImg}
                            alt="Smartphones"
                            style={{ height: '400px', objectFit: 'contain' }}
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}