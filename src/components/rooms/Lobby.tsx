import { useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css"
import GenericAuthorizedBtn from "../shared/GenericBtn";
import RoomCreationForm from "./RoomCreationForm";
import { useAtomValue } from "jotai";
import { accessToken } from "../../atom/store";
import { useNavigate } from "react-router";

export default function Lobby() {

    const auth = useAtomValue(accessToken);
    const navigate = useNavigate();

    const [hasEnterLobby, setHasEnterLobby] = useState(false)
    const [isRoomFormClose, setIsRoomFormClose] = useState(true)


    const HandleEnterBtn = (response: boolean) => {
        setHasEnterLobby(response);
    }

    const handleCreateRoomBtn = () => {
        // if (!auth) {
        //     navigate('/auth');
        // }
        setIsRoomFormClose(false);
    }

    const handleCancelCreateBtn = () => {
        setIsRoomFormClose(true);
    }

    const handleJoinRoomBtn = () => {
        // if (!auth) {
        //     navigate('/auth');
        // }
    }


    return (
        <>
            <EnterLobbyBtn OpenLobbyWindow={HandleEnterBtn} />

            <section id="room-browser" hidden={!hasEnterLobby} className={clsx(style["lobby-container"], "stone-panel")}>
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
                        <GenericAuthorizedBtn btnTxtContent="Créer" btnClass="stone-btn" ConfirmClick={handleCreateRoomBtn} />
                        <GenericAuthorizedBtn btnTxtContent="Rejoindre" btnClass="stone-btn" ConfirmClick={handleJoinRoomBtn} />
                    </div>
                </div>
            </section>

            <RoomCreationForm closed={isRoomFormClose} CloseForm={handleCancelCreateBtn} />


        </>
    )
}