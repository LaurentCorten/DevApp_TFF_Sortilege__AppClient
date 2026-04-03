import type { LobbyStateType, LobbyActionType } from "../@types/lobby";



export const lobbyReducer = (state: LobbyStateType, action: LobbyActionType): LobbyStateType => {
    switch (action.type) {
        case 'SET_LOBBY_SIGNALR_SERVICE':
            return { ...state, lobbySignalRService: action.payload };
        case "SET_ROOMS_LIST":
            return { ...state, avalaibleRooms: action.payload }
        default:
            return state;
    }
}