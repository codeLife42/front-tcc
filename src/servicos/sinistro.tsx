import axios from "axios";

const sinistroAPI = axios.create({
  baseURL: "http://localhost:3333/sinistros",
});

async function patchSinistroCliente(idSinistro: String) {
  const response = await sinistroAPI.patch("/", idSinistro, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response) {
    console.log("Sucesso ao criar novo sinistro", response);
  }
}

async function patchSituacaoSinistro(
  idSinistro: String,
  statusDocumentacao: String
) {
  console.log(idSinistro);
  console.log(statusDocumentacao);

  const response = await sinistroAPI.patch(`/${idSinistro}`, {
    id_sinistro: idSinistro,
    status: statusDocumentacao,
  });

  console.log("Patch Situacao Sinistro:", response);

  return response.data;
}

export { patchSinistroCliente, patchSituacaoSinistro };
