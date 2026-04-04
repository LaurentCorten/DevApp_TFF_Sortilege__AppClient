import { useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import NewRoomForm from "./RoomCreationForm";
import RoomsList from "./RoomsList";
import { LobbySignalRService } from "../../services/lobby/lobby.signalR.service";
import { toast } from "sonner";
import { JoinLobby } from "../../services/lobby/lobby.controllers.service";
import { useGlobalState } from "../../context/Context";

const ConnectLobby = async () => {
    const { lobbyDispatch } = useGlobalState();


    // 1. Start the SignalR connection
    const lobbySignalRService = new LobbySignalRService(lobbyDispatch);
    const connectionResult = await lobbySignalRService.createLobbyConnection();
    if (!connectionResult.success) {
        toast.error(connectionResult.error);
        return;
    }

    // 2. Join the global lobby SignalR group
    const connectionId = lobbySignalRService.getConnectionId();
    if (connectionId) {
        const joinResult = await JoinLobby(connectionId);
        if (!joinResult.success) {
            toast.error(joinResult.error);
            return;
        }
    }

    // 3. Store the service instance in lobby state
    lobbyDispatch({ type: "SET_LOBBY_SIGNALR_SERVICE", payload: lobbySignalRService });
}

export default function Lobby() {

    const [hasEnterLobby, setHasEnterLobby] = useState(false);
    const [isRoomFormClose, setIsRoomFormClose] = useState(true);


    const handleEnterBtn = (response: boolean) => {
        setHasEnterLobby(response);
        ConnectLobby();


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
            <EnterLobbyBtn OpenLobbyWindow={handleEnterBtn} />

            <section id="room-browser" hidden={!hasEnterLobby} className={clsx(style["lobby-container"], "stone-panel-800")}>
                <div className={clsx(style["lobby-inner-frame"])}>
                    <div className={clsx(style["roomList-container"], "stone-panel-900")}>
                        <p className={clsx(style["room-container"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <RoomsList hasEnterLobby={hasEnterLobby} />
                    </div>
                    <div className={style["lobbyBtns-container"]}>
                        <GenericAuthorizedBtn btnTxtContent="Créer" btnClass={clsx(style['newRoomForm-btn'], "stone-btn")} ConfirmClick={handleCreateRoomBtn} />
                        <GenericAuthorizedBtn btnTxtContent="Rejoindre" btnClass={clsx(style['newRoomForm-btn'], "stone-btn")} ConfirmClick={handleJoinRoomBtn} />
                    </div>
                </div>
            </section>

            <NewRoomForm closed={isRoomFormClose} CloseForm={handleCancelCreateBtn} />


        </>
    );
}