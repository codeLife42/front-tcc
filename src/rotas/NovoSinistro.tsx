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

  const handlePesquisaChange = (event: any) => {
    setPesquisa(event.target.value);
    console.log(pesquisa);
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
          {filteredClientes.map((cliente) => (
            <tr key={cliente.cliente_cpf}>
              <td>{cliente.cliente_cpf}</td>
              <td>{cliente.cliente_nome}</td>
              <td>{cliente.seguro_nome}</td>
              <td>
                <a href="">Novo Sinistro</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}
