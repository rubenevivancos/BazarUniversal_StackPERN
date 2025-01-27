import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from "axios";

import { store } from "./Redux/Store/store";
import App from './App';

//Se importa Bootstrap para todas las paginas
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL='http://localhost:3001';



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