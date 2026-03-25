import logo from "../../assets/images/logoSansFond.png";
import style from './Header.module.css';
import { Link } from "react-router";
import BurgerMenu from "../../features/navigation/Hamburger";
import NavBar from "../../features/navigation/NavBar";

export default function Header() {

    return (
        <header id='header' className={style["main-header"]}>
            <div className={style["mobile-container"]}>
                <div className={style["logo-container"]}>
                    <img className={style["header-img"]} src={logo} alt="logo des six lances" />
                </div>
                <div className={style["title-container"]}>
                    <Link to="/" className="no-hover"><h1 id="mon-titre">Sortilège</h1></Link>
                </div>
                <div className={style["burger-container"]}>
                    <BurgerMenu />
                </div>
            </div>
            <div className={style["nav-container"]}>
                <NavBar />
            </div>
        </header>
    );
}
