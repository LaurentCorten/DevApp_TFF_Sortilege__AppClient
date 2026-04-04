import clsx from "clsx";
import type { RoomProps } from "../../@types/lobby";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import { useState } from "react";




export default function Room({ closed, roomId }: RoomProps) {

    const [isDisabled, setIsDisabled] = useState(true);

    const handleStartGameBtn = () => { };

    const handleLeaveRoomBtn = () => { };

    return (
        <section className={clsx(style["room-container"], "stone-panel-800")} hidden={closed}>
            <div className="stone-panel-inner-frame">
                <div className={clsx(style["room-content-container"], "stone-panel-900")}>
                    <p>Bienvenue dans le salon : {roomId}.</p>
                    <p> En attente d'un autre joueur...</p>
                </div>
                <div className={style["lobby-btns-container"]}>
                    <GenericAuthorizedBtn btnTxtContent="Démarrer" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleStartGameBtn} isHidden={false} isDisabled={isDisabled} />
                    <GenericAuthorizedBtn btnTxtContent="Quitter" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleLeaveRoomBtn} isHidden={false} isDisabled={false} />
                </div>
            </div>
        </section >
    )
}