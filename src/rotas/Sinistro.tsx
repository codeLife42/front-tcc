import { Link, useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { useEffect, useState } from "react";
import { getCliente } from "../servicos/cliente";
import FileModal from "../Components/FileModal";

export function Sinistro() {
  const id = useParams();
  const [clienteFiltrado, setClienteFiltrado] = useState([]);
  const [idParametro, setIdParametro] = useState<string | null>(null);
  // Estado para controlar a exibição do modal de seleção de arquivo
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Estado para manter o arquivo selecionado

  const [activeTab, setActiveTab] = useState("aba1"); // Estado para controlar a aba ativa

  //Seleciona o tipo de documento (Certidao Obito, documentacao sinistrado etc)
  const [documentType, setDocumentType] = useState(String);

  const [idSinistro, setIdSinistro] = useState(String);

  //Seleciona o tipo de modal
  const [modalTipo, setModalTipo] = useState("");

  const [carregando, setCarregando] = useState(true);

  console.log(clienteFiltrado);

  // Função para alternar entre as abas
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    if (id.id) {
      const idParametroLink = id.id.toString();
      setIdParametro(idParametroLink);
      fetchClienteFiltrado(idParametroLink);
      setDocumentType(documentType);
    }
  }, [id, documentType]);

  async function fetchClienteFiltrado(id: String) {
    const clienteFiltrados = await getCliente(id);
    setClienteFiltrado(clienteFiltrados);
    setCarregando(false);
  }

  // Função para lidar com a seleção de arquivo
  const handleFileSelection = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedFile(selectedFile);
      console.log(e);
      setShowFileModal(false);
    }

    // Fecha o modal após selecionar o arquivo
  };

  // Função para abrir o modal de seleção de arquivo
  const openFileModal = (documentName: any, modalTipo: String) => {
    setDocumentType(documentName);
    setIdSinistro(clienteFiltrado.id_sinistro);
    setModalTipo(modalTipo);
    setShowFileModal(true);
  };

  // Função para fechar o modal de seleção de arquivo
  const closeFileModal = () => {
    setShowFileModal(false);
  };

  if (!carregando) {
    return (
      <div>
        <Header></Header>
        <div>
          <div>
            <h3>Sinistro - {clienteFiltrado.nome}</h3>
          </div>
          <div>
            <p>DOCUMENTAÇÃO</p>
          </div>
          <form action="#">
            <div className="App">
              <div className="tabs">
                <button
                  className={activeTab === "aba1" ? "active" : ""}
                  onClick={() => handleTabClick("aba1")}
                >
                  Documentação Sinistro
                </button>
                <button
                  className={activeTab === "aba2" ? "active" : ""}
                  onClick={() => handleTabClick("aba2")}
                >
                  Documentação Beneficiário
                </button>
                <button
                  className={activeTab === "aba3" ? "active" : ""}
                  onClick={() => handleTabClick("aba3")}
                >
                  Documentação complementar
                </button>
              </div>

              {activeTab === "aba1" && (
                <table border="1">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
                      <th>Data Emissao</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Certidão de óbito</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal("certidao-obito", "salvar-arquivos")
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          href="#"
                          type="Link"
                          onClick={() =>
                            openFileModal("certidao-obito", "exibir-arquivos")
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Documentação identificação sinistrado</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal("id-sinistrado", "salvar-arquivos")
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          type="link"
                          href="#"
                          onClick={() =>
                            openFileModal("id-sinistrado", "exibir-arquivos")
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Declaração herdeiros legais</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal(
                              "declaracao-herdeiros",
                              "salvar-arquivos"
                            )
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          href="#"
                          type="Link"
                          onClick={() =>
                            openFileModal(
                              "declaracao-herdeiros",
                              "exibir-arquivos"
                            )
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "aba2" && (
                <table border="1">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
                      <th>Data Emissao</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Documento identificação beneficiário</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal("id-beneficiario", "salvar-arquivos")
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          href="#"
                          type="Link"
                          onClick={() =>
                            openFileModal("id-beneficiario", "exibir-arquivos")
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Comprovante de endereço</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal(
                              "comprovante-endereco",
                              "salvar-arquivos"
                            )
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          href="#"
                          type="Link"
                          onClick={() =>
                            openFileModal(
                              "comprovante-endereco",
                              "exibir-arquivos"
                            )
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}

              {activeTab === "aba3" && (
                <table border="1">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
                      <th>Data Emissao</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Documentação complementar</td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openFileModal(
                              "documentacao-complementar",
                              "salvar-arquivos"
                            )
                          }
                        >
                          Selecionar Arquivo
                        </button>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <a
                          href="#"
                          type="Link"
                          onClick={() =>
                            openFileModal(
                              "documentacao-complementar",
                              "exibir-arquivos"
                            )
                          }
                        >
                          Exibir informações
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </form>
          <button>Enviar para análise</button>
        </div>
        <div>
          <Link to="/novo-sinistro">
            <button>Voltar</button>
          </Link>
        </div>

        <FileModal
          showModal={showFileModal}
          onClose={closeFileModal}
          onFileSelect={handleFileSelection}
          documentType={documentType}
          idSinistro={idSinistro}
          modalTipo={modalTipo}
        />
      </div>
    );
  }
}
