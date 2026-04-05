import style from "./Lobby.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import type { OpenLobbyWindowType } from "../../@types/lobby";
import clsx from "clsx";
import { useGlobalState } from "../../context/Context";


export default function EnterLobbyBtn({ OpenLobbyWindow }: OpenLobbyWindowType) {

    const navigate = useNavigate();
    const { memberState } = useGlobalState();
    const auth = memberState.accessToken;
    const BtnTxtContent = "LOBBY";
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const EnterLobby = () => {
        if (!auth) {
            navigate('/auth');
            return;
        }
        setIsHidden(true);
        OpenLobbyWindow(true);
    };

    return (
        <>
            <button type="button" hidden={isHidden} className={clsx(style["enter-lobby-btn"], "stone-btn")} onClick={() => EnterLobby()}>{BtnTxtContent}</button>
        </>
    );
}