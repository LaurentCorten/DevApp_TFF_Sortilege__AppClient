import { useAtomValue } from "jotai";
import style from "./Lobby.module.css";
import { useState } from "react";
import { accessToken } from "../../atom/store";
import { useNavigate } from "react-router";
import type { OpenLobbyWindowType } from "../../@types/lobby";
import clsx from "clsx";


export default function EnterLobbyBtn({ OpenLobbyWindow }: OpenLobbyWindowType) {

    const auth = useAtomValue(accessToken);
    const navigate = useNavigate();

    const BtnTxtContent = "LOBBY";
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const EnterLobby = () => {
        // if (!auth) {
        //     navigate('/auth');
        // }
        setIsHidden(true);
        OpenLobbyWindow(true);
    };

    return (
        <>
            <button type="button" hidden={isHidden} className={clsx(style["enter-lobby-btn"], "stone-btn")} onClick={() => EnterLobby()}>{BtnTxtContent}</button>
        </>
    );
}