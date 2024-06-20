import { Link } from "react-router-dom";
import { Header } from "../Components/Header";
import "../global.css";
import { useEffect, useState } from "react";
import { getSeguroCliente } from "../servicos/segurocliente";

export function NovoSinistro() {
  const [seguroCliente, setSeguroCliente] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fecthClientes();
  }, []);

  //Busca os clientes no back-end
  async function fecthClientes() {
    const clientesFiltrados = await getSeguroCliente();
    setSeguroCliente(clientesFiltrados);
    setCarregando(false);
  }

  //Filtro da barra de pesquisa
  const handlePesquisaChange = (event: any) => {
    setPesquisa(event.target.value);
    console.log(seguroCliente);
  };

  //Altera no banco de dados o status do sinistro ao clicar no botao novo sinistro
  const handleNovoSinistro = async (clienteId: String, sinistroId: String) => {
    try {
      window.location.href = "/sinistro/" + clienteId;
    } catch (error) {
      console.log("Erro ao criar sinistro", error);
    }
  };

  const filteredClientes = seguroCliente.filter((seguro) => {
    const nomeCliente = seguro.cliente_nome.toLowerCase();
    const barraPesquisa = pesquisa.toLocaleLowerCase();

    return nomeCliente.includes(barraPesquisa);
  });

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Header />
      <input
        type="text"
        id="search-input"
        placeholder="Pesquisar cliente..."
        value={pesquisa}
        onChange={handlePesquisaChange}
      />
      <table border="1">
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Seguro</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          {
            //Filtrar somente os clientes com status do sinistro disponivel
            filteredClientes.map((cliente) => {
              console.log(cliente);
              if (cliente.sinistro_status === "Disponivel") {
                return (
                  <tr key={cliente.cliente_cpf}>
                    <td>{cliente.cliente_cpf}</td>
                    <td>{cliente.cliente_nome}</td>
                    <td>{cliente.seguro_nome}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleNovoSinistro(
                            cliente.cliente_id,
                            cliente.sinistro_id
                          )
                        }
                      >
                        Novo Sinistro
                      </button>
                    </td>
                  </tr>
                );
              }
            })
          }
        </tbody>
      </table>
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}
