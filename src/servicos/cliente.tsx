import axios from "axios";

//Busca os clientes na requisicao
const clienteAPI = axios.create({
  baseURL: "http://localhost:3333/clientes",
});

async function getCliente(id: String) {
  const response = await clienteAPI.get(`/${id}`);
  return response.data[0];
}

export { getCliente };
