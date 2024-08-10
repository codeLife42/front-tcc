import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { getCliente } from "../servicos/cliente";
import FileModal from "../Components/FileModal";
import { patchSituacaoSinistro } from "../servicos/sinistro";
import GlobalContext from "../Components/GlobalContext";
import Swal from "sweetalert2";
import "../global.css";

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

  //Valida se o botao pode ser habilitado ou nao
  const [buttonDisable, setButtonDisable] = useState(false);

  const [optionChoose, setOptionChoose] = useState<String>("Aprovado");

  const { userType, setUserType } = useContext(GlobalContext);

  useEffect(() => {
    if (clienteFiltrado.status === "Documentacao enviada") {
      setButtonDisable(true);
    }
    if (clienteFiltrado.status === "Documentacao aprovada") {
      setButtonDisable(true);
    }
    const updateSinistro = async () => {
      if (optionChoose !== "Aprovado") {
        const serverResponse = await patchSituacaoSinistro(
          clienteFiltrado.id_sinistro,
          optionChoose
        );
        window.location.href = "http://localhost:5173/";
      }
    };
    if (optionChoose !== "Aprovado") updateSinistro();
  }, [optionChoose, clienteFiltrado]);

  console.log(clienteFiltrado);

  // Função para alternar entre as abas
  const handleTabClick = (tabName: any) => {
    setActiveTab(tabName);
  };

  //Funcao para enviar o formulario
  async function handleSendForm(
    idSinistro: String,
    statusDocumentacao: String
  ) {
    if (userType === "user.banco") {
      //const userConfirmed = window.confirm(
      //  "Voce realmente deseja enviar para analise?"
      //);

      const result = await Swal.fire({
        title: "Voce realmente deseja enviar para analise?",
        text: "confirme sua solicitacao",
        icon: "question",
        showCancelButton: true,
        showDenyButton: false,
        confirmButtonText: "Enviar documentação",
        cancelButtonText: "Cancelar",
      });

      const serverResponse = await patchSituacaoSinistro(
        idSinistro,
        statusDocumentacao
      );

      if (result.isConfirmed) {
        Swal.fire("Resposta Enviada");
        setOptionChoose("Documentacao enviada");
      } else {
        // Ação para o Cancelamento
        Swal.fire("Você cancelou a operação.");
        return;
      }
    } else if (userType === "user.seguradora") {
      const result = await Swal.fire({
        title: "Avaliação de documentação",
        text: "Escolha uma das opções abaixo",
        icon: "question",
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: "Aprovar documentação",
        denyButtonText: "Rejeitar documentação",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        Swal.fire("Resposta Enviada");
        setOptionChoose("Documentacao aprovada");
      } else if (result.isDenied) {
        Swal.fire("Resposta Enviada");
        setOptionChoose("Documentacao rejeitada");
      } else {
        // Ação para o Cancelamento
        Swal.fire("Você cancelou a operação.");
        return;
      }
    }
  }

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

  //User banco
  if (!carregando && userType === "user.banco") {
    return (
      <div>
        <Header></Header>
        <div>
          <div className="cabecalho">
            <h3>Sinistro - {clienteFiltrado.nome}</h3>
          </div>
          <form action="#">
            <div className="App">
              <div className="tabs pagination">
                <button
                  className={`{activeTab === "aba1" ? "active" : ""} `}
                  onClick={() => handleTabClick("aba1")}
                >
                  Documentação Sinistro
                </button>
                <button
                  className={`{activeTab === "aba2" ? "active" : ""} `}
                  onClick={() => handleTabClick("aba2")}
                >
                  Documentação Beneficiário
                </button>
                <button
                  className={`{activeTab === "aba3" ? "active" : ""} `}
                  onClick={() => handleTabClick("aba3")}
                >
                  Documentação complementar
                </button>
              </div>

              {activeTab === "aba1" && (
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Arquivo</th>
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
                          disabled={buttonDisable}
                          className="selecionarArquivoButton"
                        >
                          Selecionar Arquivo
                        </button>
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
        </div>
        <div className="buttonContainer">
          <Link to="/">
            <button className="backButtonForm">Voltar</button>
          </Link>
          <button
            onClick={() =>
              handleSendForm(
                clienteFiltrado.id_sinistro,
                "Documentacao enviada"
              )
            }
            disabled={buttonDisable}
            className="sendButton"
          >
            Enviar para análise
          </button>
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

    //User seguradora
  } else if (!carregando && userType === "user.seguradora") {
    return (
      <div>
        <Header></Header>
        <div>
          <div className="cabecalho">
            <h3>Sinistro - {clienteFiltrado.nome}</h3>
          </div>
          <form action="#">
            <div className="App">
              <div className="tabs pagination">
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
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Certidão de óbito</td>

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
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Documento identificação beneficiário</td>
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
                <table className="styledTable">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Documentação complementar</td>
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
          <div className="buttonContainer">
            <Link to="/novo-sinistro">
              <button className="backButtonForm">Voltar</button>
            </Link>

            <button
              onClick={() =>
                handleSendForm(
                  clienteFiltrado.id_sinistro,
                  "Avaliacao documentacao"
                )
              }
              className="sendButton"
            >
              Responder solicitação
            </button>
          </div>
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
