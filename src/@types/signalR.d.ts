import type { Room } from "./rooms";
import { LobbySignalRService } from "../services/lobby/lobby.signalR.service";


export interface LobbySignalRState {
    lobbySignalRService: LobbySignalRService | null;
    avalaibleRooms: Room[];
}

