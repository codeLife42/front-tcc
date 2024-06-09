import { Header } from "../Components/Header";
import "../global.css";
import { Table } from "../Components/Table";
import { Link } from "react-router-dom";

export function Home(){
  return (
    <div>
      <Header/>
      <Link to="/novo-sinistro"><button>Novo Sinistro</button></Link>
      <Table></Table>
    </div>
  )
}