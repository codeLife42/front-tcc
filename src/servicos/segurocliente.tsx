import axios from "axios";

const seguroClienteAPI = axios.create({
  baseURL: "http://localhost:3333/segurocliente",
});

async function getSeguroCliente() {
  const response = await seguroClienteAPI.get("/");

  return response.data.seguroCliente;
}

export { getSeguroCliente };
