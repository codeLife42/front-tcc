import styles from "./Header.module.css";
import banrisulLogo from "../assets/logo-banrisul.svg";
import { Link } from "react-router-dom";

export function Header(){
    return (
        <header className={styles.header}>
            <Link to="/">
            <img src={banrisulLogo} alt="Logo do banrisul em svg" />
            <strong>sinistro fácil</strong>
            </Link>
            <select>
                <option>Usuário banrisul</option>
                <option>Usuário seguradora</option>
            </select>
        </header>
    )
}