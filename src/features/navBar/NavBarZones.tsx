import { Link } from 'react-router';


export default function NavBarZones() {

    return (
        <nav className='nav-bar'>
            <ul>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/game">Le Jeu</Link>
                </li>
                <li>
                    <Link to="/profile">Votre Profile</Link>
                </li>
                <li>
                    <Link to="/auth">Connection</Link>
                </li>
            </ul>
        </nav>
    );
}