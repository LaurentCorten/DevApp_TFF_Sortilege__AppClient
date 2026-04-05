import { useEffect, useState } from "react";
import type { RoomsListPropsType } from "../../@types/lobby";
import { useGlobalState } from "../../context/Context";
import { PullRoomsList } from "../../services/lobby/lobby.controllers.service";
import clsx from "clsx";
import style from "./Lobby.module.css";



export default function RoomsList({ hasEnterLobby, onclickRoomBar, selectedRoomId }: RoomsListPropsType) {
    const { lobbyState, lobbyDispatch, memberState } = useGlobalState();
    const [hasFailed, setHasFailed] = useState(false);

    useEffect(() => {
        // Guard if lobby not open yet
        if (!hasEnterLobby) return;

        const fetchRoomsList = async () => {
            const result = await PullRoomsList(memberState.accessToken);
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
            {lobbyState.availableRooms
                .filter(room => room.guestId === null)
                .map((room) => (
                    <p key={room.id} className={clsx(style["room-bar"], "stone-bar", selectedRoomId === room.id && style["room-bar--selected"])} onClick={() => onclickRoomBar(room.id)}>
                        <span>{room.name}</span>|<span>{room.creatorId}</span>
                        {hasFailed && (<span>Erreur de Chargement, veuillez recharger la page.</span>)}
                    </p>
                ))
            }
        </>
    );
}