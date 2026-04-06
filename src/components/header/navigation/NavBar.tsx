import { Link } from 'react-router';
import style from "./Navigation.module.css";
import AuthBtn from './AuthBtn';


export default function NavBar() {

    return (
        <nav id="nav-bar" className={style["nav-bar"]}>
            <ul>
                <li>
                    <Link to="/">Taverne</Link>
                </li>
                <li>
                    <Link to="/playroom">Salle de jeu</Link>
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