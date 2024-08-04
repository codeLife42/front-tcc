import styles from "./Header.module.css";
import banrisulLogo from "../assets/logo-banrisul.svg";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";

export function Header() {
  const { userType, setUserType } = useContext(GlobalContext);

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  const handleChange = (event: any) => {
    setUserType(event.target.value);
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <img src={banrisulLogo} alt="Logo do banrisul em svg" />
        <strong>sinistro fácil</strong>
      </Link>
      <select value={userType} onChange={handleChange}>
        <option value="user.banco">Usuário banrisul</option>
        <option value="user.seguradora">Usuário seguradora</option>
      </select>
    </header>
  );
}
