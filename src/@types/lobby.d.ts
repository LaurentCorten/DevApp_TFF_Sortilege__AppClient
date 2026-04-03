import type { ZodGUID } from "zod";
import { LobbySignalRService } from "../services/lobby/lobby.signalR.service"

export type OpenLobbyWindowType = { OpenLobbyWindow: (response: boolean) => void, };

export type LobbyStateType = {
    lobbySignalRService: LobbySignalRService | null;
    avalaibleRooms: Room[];
}

export type LobbyActionType =
    | { type: 'SET_LOBBY_SIGNALR_SERVICE'; payload: LobbySignalRService; }
    | { type: "SET_ROOMS_LIST", payload: Room[]; }

export type NewRoomState = {
    formData: FormData | null,
    error: {
        name?: string[];
        server?: string;
    } | null
};

export type NewRoomFormProps = {
    closed: boolean,
    CloseForm: () => void;
}

export type Room = {
    id: string;
    name: string;
    creatorId: string;
    guestId?: string | null;
    creationDate: string;
}

export type RoomsListPropsType = {
    hasEnterLobby: boolean;
}