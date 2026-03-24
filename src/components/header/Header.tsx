import logo from "../../assets/images/logoSansFond.png";
import style from './Header.module.css';
import { Link } from "react-router";
import BurgerMenu from "../../features/navigation/Hamburger";

export default function Header() {

    return (
        <header id='header' className={style["main-header"]}>
            <div className={style["logo-container"]}>
                <img className={style["header-img"]} src={logo} alt="logo des six lances" />
            </div>
            <div className={style["title-container"]}>
                <Link to="/"><h1>Sortilège</h1></Link>
            </div>
            <div className={style["burger-container"]}>
                <BurgerMenu />
            </div>
        </header>
    );
}
