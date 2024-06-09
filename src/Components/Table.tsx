import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { getSinistroCliente } from "../servicos/sinistrocliente";

export function Table() {
  const [sinistroCliente, setSinistroCliente] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carteira, setCarteira] = useState("Todas");
  const [pesquisa, setPesquisa] = useState("");

  const handleCarteiraChange = (event) => {
    setCarteira(event.target.value);
  };

  const handlePesquisaChange = (event) => {
    setPesquisa(event.target.value);
  };

  useEffect(() => {
    fecthClientes();
  }, []);

  //Busca os clientes no back-end
  async function fecthClientes() {
    const clientesFiltrados = await getSinistroCliente();
    setSinistroCliente(clientesFiltrados);
    setCarregando(false);
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  const pesquisaCliente = sinistroCliente.filter((sinistro) => {
    const nomeCliente = sinistro.nome.toLowerCase();
    const barraPesquisa = pesquisa.toLocaleLowerCase();

    return nomeCliente.includes(barraPesquisa);
  });

  return (
    <div className={styles.positionTable}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          id="search-input"
          placeholder="Pesquisar cliente..."
          value={pesquisa}
          onChange={pesquisaCliente}
        />
        <button className={styles.searchButton} id="search-button">
          Pesquisar
        </button>
      </div>
      <div className={styles.radioButtons}>
        <input type="radio" id="cpf-radio" name="search-option" value="cpf" />
        <label>CPF</label>
        <input type="radio" id="nome-radio" name="search-option" value="nome" />
        <label>Nome</label>
      </div>

      <select
        className={styles.customSelect}
        value={carteira}
        name="Carteiras"
        onChange={handleCarteiraChange}
      >
        <option value="Todas">Todas</option>
        <option value="Plataforma PF">Plataforma</option>
        <option value="Carteira 01">Carteira 01</option>
        <option value="Carteira 02">Carteira 02</option>
      </select>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Carteira</th>
            <th>Nome</th>
            <th>Etapa</th>
          </tr>
        </thead>
        <tbody>
          {sinistroCliente.map((sinistro) => {
            if (sinistro.carteira === carteira) {
              console.log(carteira);
              return (
                <tr key={sinistro.id}>
                  <td>{sinistro.cpf}</td>
                  <td>{sinistro.carteira}</td>
                  <td>{sinistro.nome}</td>
                  <td>
                    <a href="">{sinistro.status}</a>
                  </td>
                </tr>
              );
            }
            if (carteira === "Todas") {
              return (
                <tr key={sinistro.id}>
                  <td>{sinistro.cpf}</td>
                  <td>{sinistro.carteira}</td>
                  <td>{sinistro.nome}</td>
                  <td>
                    <a href="">{sinistro.status}</a>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <label id="pg1">1</label>
        <label id="pg2">2</label>
        <label id="pg3">3</label>
      </div>
    </div>
  );
}
