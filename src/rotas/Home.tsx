import { Header } from "../Components/Header";
import "../global.css";
import { Table } from "../Components/Table";
import { Link } from "react-router-dom";
import GlobalContext from "../Components/GlobalContext";
import { useContext, useEffect, useState } from "react";

export function Home() {
  const { userType } = useContext(GlobalContext);

  const [esconderBotao, setEsconderBotao] = useState(false);

  useEffect(() => {
    if (userType === "user.banco") {
      setEsconderBotao(false);
    } else if (userType === "user.seguradora") {
      setEsconderBotao(true);
    }
  }, [userType]);

  return (
    <div>
      <Header />

      <Link to="/novo-sinistro">
        <button className="customButton" hidden={esconderBotao}>
          Novo Sinistro
        </button>
      </Link>
      <Table></Table>
    </div>
  );
}
