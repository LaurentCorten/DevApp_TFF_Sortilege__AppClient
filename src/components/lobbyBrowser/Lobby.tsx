import { useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css"
import { GenericAuthorizedBtn } from "../shared/GenericBtn";

export default function Lobby() {

    const [hasEnter, setHasEnter] = useState(false)

    const HandleEnterBtn = (response: boolean) => {
        setHasEnter(response);
    }

    const handleCreateRoomBtn = (response: boolean) => { }
    const handleJoinRoomBtn = (response: boolean) => { }


    return (
        <>
            <EnterLobbyBtn OpenLobbyWindow={HandleEnterBtn} />

            <section hidden={!hasEnter} className={clsx(style["lobby-container"], "stone-panel")}>
                <div className={clsx(style["lobby-inner-frame"])}>
                    <div className={clsx(style["roomList-container"], "stone-bar")}>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        {/* <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p> */}
                    </div>
                    <div className={style["lobbyBtns-container"]}>
                        <GenericAuthorizedBtn btnTxtContent="Create Room" btnClass="stone-btn" ConfirmClick={handleCreateRoomBtn} />
                        <GenericAuthorizedBtn btnTxtContent="Join Room" btnClass="stone-btn" ConfirmClick={handleJoinRoomBtn} />
                    </div>
                </div>
            </section>
        </>
    )
}