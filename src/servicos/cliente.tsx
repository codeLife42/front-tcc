import axios from "axios";

//Busca os clientes na requisicao
const clienteAPI = axios.create({
  baseURL: "http://localhost:3333/sinistro/:id",
});

async function getSeguroCliente() {
  const response = await clienteAPI.get("/:id");

  return response.data.seguroCliente;
}

export { getSeguroCliente };
