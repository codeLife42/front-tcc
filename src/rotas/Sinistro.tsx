import { Link, useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { useEffect, useState } from "react";
import { getCliente } from "../servicos/cliente";

export function Sinistro() {
  const id = useParams();
  const [clienteFiltrado, setClienteFiltrado] = useState([]);
  const [idParametro, setIdParametro] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("aba1"); // Estado para controlar a aba ativa

  // Função para alternar entre as abas
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

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

  console.log(clienteFiltrado);

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
                    <input type="file" />
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
                    <input type="file" />
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
                    <input type="file" />
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
                    <input type="file" />
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
                    <input type="file" />
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
                    <input type="file" />
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
      </div>
      <div>
        <Link to="/novo-sinistro">
          <button>Voltar</button>
        </Link>
        <button>Salvar</button>
        <button>Enviar para análise</button>
      </div>
    </div>
  );
}
