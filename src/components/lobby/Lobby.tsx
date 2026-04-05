import { useEffect, useState } from "react";
import EnterLobbyBtn from "./EnterLobbyBtn";
import clsx from "clsx";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import NewRoomForm from "./NewRoomForm";
import RoomsList from "./RoomsList";
import { LobbySignalRService } from "../../services/lobby/lobby.signalR.service";
import { toast } from "sonner";
import { JoinLobby, JoinRoom } from "../../services/lobby/lobby.controllers.service";
import { useGlobalState } from "../../context/Context";
import Room from "./Room";



export default function Lobby() {

    const [hasEnterLobby, setHasEnterLobby] = useState(false);
    const [isRoomFormClosed, setIsRoomFormClosed] = useState(true);
    const [isRoomClosed, setIsRoomClosed] = useState(true);
    const [openRoomId, setOpenRoomId] = useState("");
    const { lobbyState, lobbyDispatch, memberState } = useGlobalState();
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

    // Handle SignalR connection
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

    // Handle the case where the member has an active room
    useEffect(() => {
        if (!memberState.member) return;

        const memberId = memberState.member.id;

        // Check if the member is already in a room (as creator or guest)
        const existingRoom = lobbyState.availableRooms.find(
            r => r.creatorId === memberId || r.guestId === memberId
        );

        if (existingRoom) {
            handleOpenRoom(existingRoom.id);
        }
    }, [lobbyState.availableRooms]);

    // Handle room selection
    const handleClickRoomBar = (roomId: string) => {
        // Deselect if already selected, select otherwise
        setSelectedRoomId(id => id === roomId ? null : roomId);
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

    const handleCloseRoom = () => {
        setIsRoomClosed(true);
    }

    const handleCancelCreateBtn = () => {
        setIsRoomFormClosed(true);
    };

    const handleJoinRoomBtn = async () => {
        if (!selectedRoomId) return;

        const connectionId = lobbyState.lobbySignalRService?.getConnectionId();
        if (!connectionId) return;

        const result = await JoinRoom(selectedRoomId, connectionId, memberState.accessToken);
        if (!result.success) {
            toast.error(result.error);
            return;
        }

        // Open the room window
        handleOpenRoom(result.data.id);
    };


    return (
        <>
            <EnterLobbyBtn OpenLobbyWindow={handleEnterBtn} />

            <section id="room-browser" hidden={!hasEnterLobby} className={clsx(style["lobby-container"], "stone-panel-800")}>
                <div className="stone-panel-inner-frame">
                    <div className={clsx(style["roomList-container"], "stone-panel-900")}>
                        <p className={clsx(style["roomList-bar"], "stone-bar")}><span>Nom</span>|<span>Joueurs</span></p>
                        {/* <p className={clsx(style["room-bar"], "stone-bar")}><span>Test</span>|<span>16874-6854863</span></p> */}
                        <RoomsList hasEnterLobby={hasEnterLobby} onclickRoomBar={handleClickRoomBar} selectedRoomId={selectedRoomId} />
                    </div>
                    <div className={style["lobby-btns-container"]}>
                        <GenericAuthorizedBtn btnTxtContent="Créer" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleCreateRoomBtn} isHidden={false} isDisabled={false} />
                        <GenericAuthorizedBtn btnTxtContent="Rejoindre" btnClass={clsx(style['lobby-btn'], "stone-btn")} ConfirmClick={handleJoinRoomBtn} isHidden={false} isDisabled={selectedRoomId === null} />
                    </div>
                </div>
            </section>

            <NewRoomForm closed={isRoomFormClosed} CloseForm={handleCancelCreateBtn} OpenRoom={handleOpenRoom} />

            <Room closed={isRoomClosed} roomId={openRoomId} onLeaveRoom={handleCloseRoom} />

        </>
    );
}