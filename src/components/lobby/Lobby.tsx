import { useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import NewRoomForm from "./NewRoomForm";
import RoomsList from "./RoomsList";
import { LobbySignalRService } from "../../services/lobby/lobby.signalR.service";
import { toast } from "sonner";
import { JoinLobby } from "../../services/lobby/lobby.controllers.service";
import { useGlobalState } from "../../context/Context";
import Room from "./Room";



export default function Lobby() {

    const [hasEnterLobby, setHasEnterLobby] = useState(false);
    const [isRoomFormClosed, setIsRoomFormClosed] = useState(true);
    const [isRoomClosed, setIsRoomClosed] = useState(true);
    const [openRoomId, setOpenRoomId] = useState("");
    const { lobbyDispatch, memberState } = useGlobalState();

    const ConnectLobby = async () => {

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
            const joinResult = await JoinLobby(connectionId, memberState.accessToken);
            if (!joinResult.success) {
                toast.error(joinResult.error);
                return;
            }
        }

        // 3. Store the service instance in lobby state
        lobbyDispatch({ type: "SET_LOBBY_SIGNALR_SERVICE", payload: lobbySignalRService });
    }

    const handleEnterBtn = (response: boolean) => {
        setHasEnterLobby(response);
        ConnectLobby();
    };

    const handleCreateRoomBtn = () => {
        setIsRoomFormClosed(false);
    };

    const handleOpenRoom = (id: string) => {
        setOpenRoomId(id);
        setIsRoomClosed(false);
    };

    const handleCancelCreateBtn = () => {
        setIsRoomFormClosed(true);
    };

    const handleJoinRoomBtn = () => {
    };


    return (
        <>
            <EnterLobbyBtn OpenLobbyWindow={handleEnterBtn} />

            <section id="room-browser" hidden={!hasEnterLobby} className={clsx(style["lobby-container"], "stone-panel-800")}>
                <div className="stone-panel-inner-frame">
                    <div className={clsx(style["roomList-container"], "stone-panel-900")}>
                        <p className={clsx(style["room-bar"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        <RoomsList hasEnterLobby={hasEnterLobby} />
                    </div>
                    <div className={style["lobby-btns-container"]}>
                        <GenericAuthorizedBtn btnTxtContent="Créer" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleCreateRoomBtn} isHidden={false} isDisabled={false} />
                        <GenericAuthorizedBtn btnTxtContent="Rejoindre" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleJoinRoomBtn} isHidden={false} isDisabled={false} />
                    </div>
                </div>
            </section>

            <NewRoomForm closed={isRoomFormClosed} CloseForm={handleCancelCreateBtn} OpenRoom={handleOpenRoom} />

            <Room closed={isRoomClosed} roomId={openRoomId} />

        </>
    );
}