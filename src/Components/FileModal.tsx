import PropTypes from "prop-types";
import styles from "./FileModal.module.css";
import { useEffect, useState } from "react";
import { getFiles, uploadFile } from "../servicos/arquivo";
import { Link } from "react-router-dom";

const FileModal = ({
  showModal,
  onClose,
  documentType,
  idSinistro,
  modalTipo,
}: any) => {
  //documentName - Nome do tipo do arquivo

  const [carregando, setCarregando] = useState(false);
  const [arquivos, setArquivos] = useState([]);

  const [file, setFile] = useState<File>();

  async function handleGetFiles(idSinistro: String, documentType: String) {
    setCarregando(true);

    const arquivosResponse = await getFiles(idSinistro, documentType);

    setArquivos(arquivosResponse);

    setCarregando(false);
  }

  async function handleSaveFile(
    file: File,
    documentType: String,
    idSinistro: String
  ) {
    try {
      if (file && documentType && idSinistro) {
        const responseServer = await uploadFile(
          file,
          documentType,
          idSinistro,
          file.name
        );
      } else {
        console.log("Parametros incompletos para requisicao POST");
      }
    } catch (error) {
      console.log("Erro ao fazer requisicao POST: ", error);
    }
  }

  useEffect(() => {
    console.log("rodando...");
    console.log(modalTipo);
    if (modalTipo === "exibir-arquivos") {
      handleGetFiles(idSinistro, documentType);
    }
  }, [modalTipo]);

  function handleFileSelection(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      const selectedFile = files[0];
      setFile(selectedFile);
    }
  }

  if (!showModal) {
    return null; // Não renderiza nada se showModal for falso
  }

  if (modalTipo !== "exibir-arquivos") {
    return (
      <form action="#">
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <span className={styles.close} onClick={onClose}>
              &times;
            </span>
            <h2>Selecionar Arquivo {documentType.toUpperCase()}</h2>
            <p>{idSinistro}</p>
            <input type="file" required onChange={handleFileSelection} />
            <button
              type="submit"
              onClick={() =>
                handleSaveFile(file as any, documentType, idSinistro)
              }
            >
              Salvar
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              X
            </button>
          </div>
        </div>
      </form>
    );
  } else if (modalTipo === "exibir-arquivos") {
    if (carregando) <p>Carregando...</p>;

    if (!carregando) {
      console.log(arquivos);
      return (
        <form action="#">
          <div className={styles.modal}>
            <div className={styles["modal-content"]}>
              <span className={styles.close} onClick={onClose}>
                &times;
              </span>
              <h2>Arquivos enviados</h2>
              {arquivos.map((arquivo) => {
                //Definir onde fica a pasta uploads
                const filePath = `http://localhost:3333/uploads/${arquivo.arquivo}`;

                console.log(filePath);
                return (
                  <div>
                    <a href={filePath} key={arquivo.arquivo} download>
                      {arquivo.nome}
                    </a>
                  </div>
                );
              })}
              <button className={styles.closeButton} onClick={onClose}>
                X
              </button>
            </div>
          </div>
        </form>
      );
    }
  }
};

FileModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  idSinistro: PropTypes.string.isRequired,
  modalTipo: PropTypes.string.isRequired,
};

export default FileModal;
