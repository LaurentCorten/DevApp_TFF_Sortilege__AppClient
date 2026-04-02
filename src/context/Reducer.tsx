import type { Action } from "../@types/global";
import type { LobbySignalRState } from "../@types/signalR";



export const lobbySignalRConnectionReducer = (state: LobbySignalRState, action: Action): LobbySignalRState => {
    switch (action.type) {
        case 'SET_LOBBY_SIGNALR_SERVICE':
            return { ...state, lobbySignalRService: action.payload };
        default:
            return state;
    }
}