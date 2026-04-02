import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import type { Action } from "../../@types/global";
import React from "react";


const API_URL = import.meta.env.VITE_API_URL;

export class LobbySignalRService {

    private _lobbyConnection?: HubConnection;

    constructor(private dispach: React.Dispatch<Action>) { } //TODO : trouver WTF !?

    createLobbyConnection() {

        // Define the connection
        this._lobbyConnection = new HubConnectionBuilder()
            .withUrl(API_URL + "/roomhub")
            .withAutomaticReconnect()
            .build();

        // Establish the connection
        this._lobbyConnection?.start().catch(error => console.log(error));


        this._lobbyConnection?.on("UserConnected", () => {
            console.log("Connexion au roomHub établie");
        })

        // // "Suscribe" to newRooms broadcast to catch newly added rooms
        // this._lobbyConnection?.on("ReceiveNewRoom", (newRoom: Room) => {
        //     return newRoom;
        // })
    }


}

