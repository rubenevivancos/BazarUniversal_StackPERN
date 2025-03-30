import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { monitorAuthState } from "./Redux/Actions/userAction";
import HomeWithSearchBox from './Components/HomeWithSearchBox/homeWithSearchBox';
import SearchResults from './Components/SearchResults/searchResults';
import ProductDetail from './Components/ProductDetail/productDetail';
import LogIn from './Components/LogIn/logIn';
import SignUp from './Components/SignUp/signUp';
import DeliveryMethod from './Components/ProductPurchase/deliveryMethod';
import SuccessfulPayment from './Components/PaymentGateway/successfulPayment';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(monitorAuthState()); // Inicia el monitoreo de la sesión
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWithSearchBox/>} />
        <Route path="/items" element={<SearchResults/>} />
        <Route path="/items/:id" element={<ProductDetail/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/logIn" element={<LogIn/>} />
        <Route path="/deliveryMethod" element={<DeliveryMethod/>} />
        <Route path="/successfulPayment" element={<SuccessfulPayment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;