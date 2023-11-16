import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Bienvenida, BuscarPalabras, DefaultPage} from "./Routes.js"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/defaultPage" element={<DefaultPage />} />
        <Route path="/buscarPalabras" element={<BuscarPalabras />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
