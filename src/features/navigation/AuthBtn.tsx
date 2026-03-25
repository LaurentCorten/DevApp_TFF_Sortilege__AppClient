import { useAtom } from "jotai";
import { activeToken } from "../../atom/store";
import { useNavigate } from "react-router";
import style from "./Navigation.module.css";
import type { MouseEvent } from "react";


export default function AuthBtn() {

    const [auth, setAuth] = useAtom(activeToken);
    const navigate = useNavigate();

    const authBtnAction = (e: MouseEvent) => {
        e.preventDefault();

        if (auth) {
            setAuth(null);
            navigate('/');
        } else {
            navigate('/auth');
        }
    };

    return (
        <a href="/auth" className={style["auth-btn"]} onClick={authBtnAction}>
            {auth ? 'Se déconnecter' : 'Se connecter'}
        </a>
    );

}