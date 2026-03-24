import { Link } from 'react-router';


export default function NavBar() {

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
            </ul>
        </nav>
    );
}