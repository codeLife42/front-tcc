import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./rotas/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NovoSinistro } from "./rotas/NovoSinistro.tsx";
import { Sinistro } from "./rotas/Sinistro.tsx";
import { GlobalProvider } from "./Components/GlobalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/novo-sinistro" element={<NovoSinistro />} />
          <Route path="/" element={<Home />} />
          <Route path={`/sinistro/:id`} element={<Sinistro />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
