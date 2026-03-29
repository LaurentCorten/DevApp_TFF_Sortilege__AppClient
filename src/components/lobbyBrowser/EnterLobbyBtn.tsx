import { useAtomValue } from "jotai";
import style from "./Lobby.module.css";
import { useState } from "react";
import { activeToken } from "../../atom/store";
import { useNavigate } from "react-router";

type OLW_Props = { OpenLobbyWindow: (response: boolean) => void, }

export default function EnterLobbyBtn({ OpenLobbyWindow }: OLW_Props) {

    const auth = useAtomValue(activeToken);
    const navigate = useNavigate();

    const BtnTxtContent = "LOBBY"
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const EnterLobby = () => {
        if (!auth) {
            navigate('/auth');
        }
        setIsHidden(true);
        OpenLobbyWindow(true);
    };

    return (
        <>
            <button type="button" hidden={isHidden} className={style["enter-lobby-btn"]} onClick={() => EnterLobby()}>{BtnTxtContent}</button>
        </>
    )
}