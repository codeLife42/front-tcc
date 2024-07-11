import axios from "axios";

//Busca os clientes na requisicao
const arquivoAPI = axios.create({
  baseURL: "http://localhost:3333/arquivos",
});

async function uploadFile(
  file: File,
  documentType: String,
  idSinistro: String
) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("idSinistro", idSinistro);

    const response = await arquivoAPI.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Resposta do servidor: ", response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export { uploadFile };
