import { Link } from 'react-router';
import style from "./Navigation.module.css";
import AuthBtn from './AuthBtn';


export default function NavBar() {

    return (
        <nav id="nav-bar" className={style["nav-bar"]}>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/game">Jeu</Link>
                </li>
                <li>
                    <Link to="/profile">Profil</Link>
                </li>
                <li>
                    <AuthBtn />
                </li>
            </ul>
        </nav >
    );
}