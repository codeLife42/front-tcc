import PropTypes from "prop-types";
import styles from "./FileModal.module.css";
import { useEffect, useState } from "react";
import { uploadFile } from "../servicos/arquivo";

const FileModal = ({ showModal, onClose, documentType, idSinistro }: any) => {
  //documentName - Nome do tipo do arquivo

  const [file, setFile] = useState<File>();

  async function handleSaveFile(
    file: File,
    documentType: String,
    idSinistro: String
  ) {
    try {
      if (file && documentType && idSinistro) {
        const responseServer = await uploadFile(file, documentType, idSinistro);

        console.log(responseServer);
      } else {
        console.log("Parametros incompletos para requisicao POST");
      }
    } catch (error) {
      console.log("Erro ao fazer requisicao POST: ", error);
    }
  }

  useEffect(() => {
    if (file && documentType && idSinistro) {
      console.log(file);
      console.log(documentType);
      console.log(idSinistro);
    }
  });

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
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <button
            type="submit"
            onClick={() => handleSaveFile(file, documentType, idSinistro)}
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  );
};

FileModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  documentType: PropTypes.string.isRequired,
  idSinistro: PropTypes.string.isRequired,
};

export default FileModal;
