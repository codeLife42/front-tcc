import PropTypes from "prop-types";
import styles from "./FileModal.module.css";

const FileModal = ({ showModal, onClose, onFileSelect, documentName }: any) => {
  function handleSaveFile() {
    console.log("Hello World!");
  }

  const handleFileSelection = (e: any) => {
    onFileSelect(e.target.files[0]);
    onClose();
  };

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
          <h2>Selecionar Arquivo {documentName}</h2>
          <input type="file" required onChange={handleFileSelection} />
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <button type="submit" onClick={handleSaveFile}>
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
  documentName: PropTypes.string.isRequired,
};

export default FileModal;
