import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import type { LobbyActionType, Room } from "../../@types/lobby";
import React from "react";
import type { ConnectionResult } from "../../@types/signalR";
import { toast } from "sonner";


const HUB_URL = import.meta.env.VITE_HUB_URL;

export class LobbySignalRService {

    private _lobbyConnection?: HubConnection;
    private _dispatch: React.Dispatch<LobbyActionType>;

    constructor(dispatch: React.Dispatch<LobbyActionType>) {
        this._dispatch = dispatch;
    }

    // Establish the base connection with SignalR lobbyHub and the listening channels for the lobbyRooms
    async createLobbyConnection(): Promise<ConnectionResult> {

        // Define the connection
        this._lobbyConnection = new HubConnectionBuilder()
            .withUrl(HUB_URL + "/lobbyhub")
            .withAutomaticReconnect([0, 2000, 5000, 10000, 30000, 60000, 120000])
            .build();

        // Establish the connection
        try {
            await this._lobbyConnection.start()
        } catch (error) {
            this._lobbyConnection = undefined;
            return { success: false, error: "Echec de connexion au lobbyHub, veuillez refresh la page !" };
        }

        // Ping to confirm connection
        this._lobbyConnection?.on("LobbyJoined", () => {
            toast.success("Connexion au lobbyHub établie");
        })

        // Listen for incoming broadcasts from the back
        this._lobbyConnection.on("RoomCreated", (room: Room) => {
            this._dispatch({ type: "ROOM_CREATED", payload: room });
        });
        this._lobbyConnection.on("RoomDeleted", (roomId: string) => {
            this._dispatch({ type: "ROOM_DELETED", payload: roomId });
        });
        this._lobbyConnection.on("RoomUpdated", (room: Room) => {
            this._dispatch({ type: "ROOM_UPDATED", payload: room });
        });

        return { success: true }
    }

    // Returns the active SignalR connection ID, null if not connected
    getConnectionId(): string | null {
        return this._lobbyConnection?.connectionId ?? null;
    }

}

