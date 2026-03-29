import { useState } from "react";
import style from "./Lobby.module.css"
import EnterLobbyBtn from "./EnterLobbyBtn";

export default function Lobby() {

    const [hasEnter, setHasEnter] = useState(false)

    const HandleEnterBtn = (response: boolean) => {
        setHasEnter(response);
    }




    return (

        <>
            <EnterLobbyBtn OpenLobbyWindow={HandleEnterBtn} />

            <section hidden={!hasEnter} className={style["lobby-container"]}>
                <p>Plein de rooms !!!</p>
            </section>
        </>
    )
}