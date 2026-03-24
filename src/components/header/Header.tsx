import NavBar from "../../features/navBar/NavBar";
import logo from "../../assets/images/logoSansFond.png";
import AuthBtn from "../../features/navBar/AuthBtn";

export default function Header() {

    return (
        <header id='header' className="header-global">
            <img className="header-img" src={logo} alt="logo des six lances" />
            <h1>Sortilège</h1>
            <NavBar />
            <AuthBtn />
        </header>
    );
}
