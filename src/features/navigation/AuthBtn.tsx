import { useAtom } from "jotai";
import { activeToken } from "../../atom/store";
import { useNavigate } from "react-router";
import style from "../../components/header/Header.module.css"


export default function AuthBtn() {

    const [auth, setAuth] = useAtom(activeToken);
    const navigate = useNavigate();

    const authBtnAction = () => {
        if (auth) {
            setAuth(null);
            navigate('/');
        } else {
            navigate('/auth')
        }
    };

    return (
        <button className={style["auth-btn"]} onClick={authBtnAction}>
            {auth ? 'Se déconnecter' : 'Se connecter'}
        </button>
    );

}