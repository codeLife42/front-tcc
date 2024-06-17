import { useParams } from "react-router-dom";
import { Header } from "../Components/Header";
import { useEffect, useState } from "react";

export function Sinistro() {
  const id = useParams();
  const [idParametro, setIdParametro] = useState<string | null>(null);
  useEffect(() => {
    if (id.id) {
      const idParametroLink = id.id.toString();
      setIdParametro(idParametroLink);
    }
  }, [id]);

  console.log(idParametro);

  return (
    <div>
      <Header></Header>
      <div>
        <p>Hello</p>
      </div>
    </div>
  );
}
