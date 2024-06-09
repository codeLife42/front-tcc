import axios from "axios";

const sinistroClienteAPI = axios.create({
  baseURL: "http://localhost:3333/sinistrocliente",
});

async function getSinistroCliente() {
  const response = await sinistroClienteAPI.get("/");

  return response.data.sinistroCliente;
}

export { getSinistroCliente };
