import { useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import RoomCreationForm from "./RoomCreationForm";


export default function Lobby() {

    const [hasEnterLobby, setHasEnterLobby] = useState(false);
    const [isRoomFormClose, setIsRoomFormClose] = useState(true);


    const HandleEnterBtn = (response: boolean) => {
        setHasEnterLobby(response);
    };

    const handleCreateRoomBtn = () => {
        setIsRoomFormClose(false);
    };

    const handleCancelCreateBtn = () => {
        setIsRoomFormClose(true);
    };

    const handleJoinRoomBtn = () => {
    };


    return (
        <>
            <EnterLobbyBtn OpenLobbyWindow={HandleEnterBtn} />

            <section id="room-browser" hidden={!hasEnterLobby} className={clsx(style["lobby-container"], "stone-panel-800")}>
                <div className={clsx(style["lobby-inner-frame"])}>
                    <div className={clsx(style["roomList-container"], "stone-panel-900")}>
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
                        <GenericAuthorizedBtn btnTxtContent="Créer" btnClass={clsx(style['newRoomForm-btn'], "stone-btn")} ConfirmClick={handleCreateRoomBtn} />
                        <GenericAuthorizedBtn btnTxtContent="Rejoindre" btnClass={clsx(style['newRoomForm-btn'], "stone-btn")} ConfirmClick={handleJoinRoomBtn} />
                    </div>
                </div>
            </section>

            <RoomCreationForm closed={isRoomFormClose} CloseForm={handleCancelCreateBtn} />


        </>
    );
}