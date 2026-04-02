import React, { createContext, useReducer } from "react";
import type { LobbySignalRState } from "../@types/signalR";
import type { Action, GlobalStateProps } from "../@types/global";
import { lobbySignalRConnectionReducer } from "./Reducer";
import { LobbySignalRService } from "../services/lobby/lobby.signalR.service";



const initialLobbySignalRStatus: LobbySignalRState = {
    lobbySignalRService: null,
    avalaibleRooms: []
}

export const GlobaleContext = createContext<{
    lobbySignalRState: LobbySignalRState;
    lobbySignalRDispatch: React.Dispatch<Action>;
}>({
    lobbySignalRState: initialLobbySignalRStatus,
    lobbySignalRDispatch: () => undefined
});


const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {

    const [lobbySignalRState, lobbySignalRDispatch] = useReducer(lobbySignalRConnectionReducer, initialLobbySignalRStatus)

    const startLobbySignalRConnection = () => { // TODO : à mettre en action mnt !
        const lobbySignalRService = new LobbySignalRService(lobbySignalRDispatch);
        lobbySignalRService.createLobbyConnection();
        lobbySignalRDispatch({ type: "SET_LOBBY_SIGNALR_SERVICE", payload: lobbySignalRService });
    }

    return (
        <GlobaleContext.Provider value={{ lobbySignalRState, lobbySignalRDispatch }}>{children}</GlobaleContext.Provider>
    )
}

export default GlobalState;