import React from 'react';
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Bienvenida, BuscarPalabras, DefaultPage, BusquedaProyecto} from "./Routes.js"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/defaultPage" element={<DefaultPage />} />
        <Route path="/buscarPalabras" element={<BuscarPalabras />} />
        <Route path="/busquedaProyecto" element={<BusquedaProyecto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
