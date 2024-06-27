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

  const [documentName, setDocumentName] = useState(String);

  // Função para alternar entre as abas
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  console.log(clienteFiltrado);

  useEffect(() => {
    if (id.id) {
      const idParametroLink = id.id.toString();
      setIdParametro(idParametroLink);
      fetchClienteFiltrado(idParametroLink);
    }
  }, [id]);

  async function fetchClienteFiltrado(id: String) {
    const clienteFiltrados = await getCliente(id);
    setClienteFiltrado(clienteFiltrados);
  }

  // Função para lidar com a seleção de arquivo
  const handleFileSelection = (e) => {
    setSelectedFile(e.target.files[0]);
    setShowFileModal(false); // Fecha o modal após selecionar o arquivo
  };

  // Função para abrir o modal de seleção de arquivo
  const openFileModal = (documentName: any) => {
    setShowFileModal(true);
    setDocumentName(documentName);
  };

  // Função para fechar o modal de seleção de arquivo
  const closeFileModal = () => {
    setShowFileModal(false);
  };

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
                    <th>Enviado</th>
                    <th>Arquivo</th>
                    <th>Data Emissao</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Certidão de óbito</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openFileModal("certidao-obito")}
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Documentação identificação sinistrado</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openFileModal("id-sinistrado")}
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Declaração herdeiros legais</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openFileModal("declaracao-herdeiros")}
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
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
                    <th>Enviado</th>
                    <th>Arquivo</th>
                    <th>Data Emissao</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ducumento identificação beneficiário</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openFileModal("id-beneficiario")}
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
                    </td>
                  </tr>
                  <tr>
                    <td>Comprovante de endereço</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openFileModal("comprovante-endereco")}
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
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
                    <th>Enviado</th>
                    <th>Arquivo</th>
                    <th>Data Emissao</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Documentação complementar</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          openFileModal("documentacao-complementar")
                        }
                      >
                        Selecionar Arquivo
                      </button>
                    </td>
                    <td>
                      <input type="date" />
                    </td>
                    <td>
                      <a href="#">Exibir informações</a>
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
        documentName={documentName}
      />
    </div>
  );
}
