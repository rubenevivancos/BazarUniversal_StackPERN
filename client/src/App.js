import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeWithSearchBox from './Components/HomeWithSearchBox/homeWithSearchBox';
import SearchResults from './Components/SearchResults/searchResults';
import ProductDetail from './Components/ProductDetail/productDetail';
import LogIn from './Components/LogIn/logIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeWithSearchBox/>} />
        <Route path="/items" element={<SearchResults/>} />
        <Route path="/items/:id" element={<ProductDetail/>} />
        <Route path="/logIn" element={<LogIn/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;