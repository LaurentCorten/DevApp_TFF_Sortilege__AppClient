import { useEffect, useState } from "react";
import type { RoomsListPropsType } from "../../@types/lobby";
import { useGlobalState } from "../../context/Context";
import { PullRoomsList } from "../../services/lobby/lobby.controllers.service";
import clsx from "clsx";
import style from "./Lobby.module.css";



export default function RoomsList({ hasEnterLobby }: RoomsListPropsType) {
    const { lobbyState, lobbyDispatch } = useGlobalState();
    const [hasFailed, setHasFailed] = useState(false);

    useEffect(() => {
        // Gard if lobby not open yet
        if (!hasEnterLobby) return;

        const fetchRoomsList = async () => {
            const result = await PullRoomsList();
            if (result.success) {
                lobbyDispatch({ type: "SET_ROOMS_LIST", payload: result.data });
            } else {
                console.error("Loading Error: ", result.error);
                setHasFailed(true);
            }
        };

        fetchRoomsList();
    }, [hasEnterLobby]);

    return (
        <>
            {lobbyState.avalaibleRooms.map((room) => (
                <p key={room.Id} className={clsx(style["room-container"], "stone-bar")}>
                    <span>{room.Name}</span>|<span>{room.CreatorId}</span>
                    {hasFailed && (<span>Erreur de Chargement, veuillez recharger la page.</span>)}
                </p>
            ))}
        </>
    );
}