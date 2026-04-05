import { useNavigate } from "react-router";
import style from "./Navigation.module.css";
import type { MouseEvent } from "react";
import { useGlobalState } from "../../../context/Context";


export default function AuthBtn() {

    const { memberState, memberDispatch } = useGlobalState();
    const auth = memberState.accessToken;
    const navigate = useNavigate();

    const authBtnAction = (e: MouseEvent) => {
        e.preventDefault();

        if (auth) {
            memberDispatch({ type: "LOG_MEMBER_OUT" });
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