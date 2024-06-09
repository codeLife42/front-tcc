import { useEffect, useState } from "react";
import styles from "./Table.module.css";
import { getSinistroCliente } from "../servicos/sinistrocliente";

export function Table() {
  const [sinistroCliente, setSinistroCliente] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carteira, setCarteira] = useState("Plataforma PF");

  useEffect(() => {
    fecthClientes();
  }, []);

  async function fecthClientes() {
    const clientesFiltrados = await getSinistroCliente();
    setSinistroCliente(clientesFiltrados);
    setCarregando(false);
  }

  console.log(sinistroCliente);
  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.positionTable}>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="text"
          id="search-input"
          placeholder="Pesquisar cliente..."
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

      <select className={styles.customSelect} name="Carteiras">
        <option value={carteira} onChange={() => setCarteira("Plataforma PF")}>
          Plataforma
        </option>
        <option value="Carteira 01">Carteira 01</option>
        <option value="Carteira 02" onChange={() => setCarteira("Carteira 02")}>
          Carteira 02
        </option>
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
            console.log(carteira);
            console.log(sinistro.carteira);
            if (sinistro.carteira === carteira) {
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
