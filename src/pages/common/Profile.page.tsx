import style from "./Taverne.module.css";

import { Navigate } from "react-router";
import { useGlobalState } from "../../context/Context";


export default function ProfilePage() {

    const { memberState } = useGlobalState();
    const auth = memberState.accessToken;

    if (!auth) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className={style["profil-container"]}>
            <h2>Page de Gestion de Profil de {memberState.member?.id} - Under construction !</h2>
        </div>
    );
}