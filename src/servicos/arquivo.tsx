import axios from "axios";

//Busca os clientes na requisicao
const arquivoAPI = axios.create({
  baseURL: "http://localhost:3333/arquivos",
});

async function uploadFile(
  file: File,
  documentType: String,
  idSinistro: String,
  fileName: String
) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);
    formData.append("idSinistro", idSinistro);
    formData.append("fileName", fileName);

    const response = await arquivoAPI.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(response.data);

    window.close();

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getFiles(idSinistro: String, tipoArquivo: String) {
  const response = await arquivoAPI.get("/", {
    params: {
      id_sinistro: idSinistro,
      tipo_arquivo: tipoArquivo,
    },
  });

  return response.data;
}

export { uploadFile, getFiles };
