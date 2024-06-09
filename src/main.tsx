import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './rotas/Home.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NovoSinistro } from './rotas/NovoSinistro.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/novo-sinistro" element={<NovoSinistro/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
