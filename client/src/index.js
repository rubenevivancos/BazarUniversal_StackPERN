import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from "axios";

import { store } from "./Redux/Store/store";
import App from './App';

//Se importa Bootstrap para todas las paginas
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL='https://libre-mercado-stack-pern-backend.vercel.app';



// Crea un root utilizando createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza el componente en el root
root.render(
  <React.StrictMode>
    <Provider store = { store }>
      <App />
    </Provider>
  </React.StrictMode>
);