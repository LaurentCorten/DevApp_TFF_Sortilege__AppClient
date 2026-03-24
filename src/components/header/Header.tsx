import logo from "../../assets/images/logoSansFond.png";
import './Header.css';
import { Link } from "react-router";
import BurgerMenu from "../../features/navigation/Hamburger";
import NavBar from "../../features/navigation/NavBar";

export default function Header() {

    return (
        <header id='header' className="main-header">
            <div className="logo-container">
                <img className="header-img" src={logo} alt="logo des six lances" />
            </div>
            <div className="title-container">
                <Link to="/"><h1>Sortilège</h1></Link>
            </div>
            <div className="burger-container">
                <BurgerMenu />
            </div>
            <div className="nav-container">
                <NavBar />
            </div>
        </header>
    );
}
