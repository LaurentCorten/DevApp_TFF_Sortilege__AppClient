import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";


const API_URL = import.meta.env.VITE_API_URL;


export async function ConnectLobbyHub() {

    // Define the connection
    const lobbyConnection: HubConnection = new HubConnectionBuilder()
        .withUrl(API_URL + "/roomhub")
        .withAutomaticReconnect()
        .build();



    // Establish the connection
    lobbyConnection.start()
        .catch(error => console.log(error));

}
