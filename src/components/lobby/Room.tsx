import clsx from "clsx";
import type { RoomProps } from "../../@types/lobby";
import style from "./Lobby.module.css";
import GenericAuthorizedBtn from "../shared/GenericBtn";
import { useGlobalState } from "../../context/Context";
import { DeleteRoom, LeaveRoom } from "../../services/lobby/lobby.controllers.service";
import { toast } from "sonner";




export default function Room({ closed, roomId, onLeaveRoom }: RoomProps) {

    const { lobbyState, memberState } = useGlobalState();

    // Get room and member data
    const room = lobbyState.availableRooms.find(r => r.id === roomId);
    const member = memberState.member;
    // -> And exit if any problem
    if (!room || !member) {
        onLeaveRoom();
    }
    // Guard for the rest of the render (just not to need ! everywhere)
    if (!room || !member) return null;

    // => Start button active only when both players are present
    const isDisabled = room.guestId === null;

    // => And Check if member is "creator"
    const isCreator = member.id === member.id;

    const handleStartGameBtn = () => { };

    const handleLeaveRoomBtn = async () => {
        const connectionId = lobbyState.lobbySignalRService?.getConnectionId();
        if (!connectionId) return;

        // If creator is alone and leave => delete
        if (isCreator && !room.guestId) {
            const result = await DeleteRoom(room.id, connectionId, memberState.accessToken);
            if (!result.success) {
                toast.error(result.error);
                return;
            }
        } else {
            // Other 2 cases => leave (back will swap guestId -> CreatorId if need)
            const result = await LeaveRoom(roomId, connectionId, memberState.accessToken);
            if (!result.success) {
                toast.error(result.error);
                return;
            }
        }

        // CallBack to lobby to close the window
        onLeaveRoom();
    };

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