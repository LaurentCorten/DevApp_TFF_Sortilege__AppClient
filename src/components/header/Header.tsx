import NavBarZones from "../../features/navBar/NavBarZones";
import logo from "../../assets/images/logoSansFond.png";

export default function Header() {

    return (
        <header id='header' className="header-global">
            <img className="header-img" src={logo} alt="logo des six lances" />
            <h1>Sortilège</h1>
            <NavBarZones />
        </header>
    );
}
