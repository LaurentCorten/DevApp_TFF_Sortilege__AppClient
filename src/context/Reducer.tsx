import type { LobbyStateType, LobbyActionType } from "../@types/lobby";



export const lobbyReducer = (state: LobbyStateType, action: LobbyActionType): LobbyStateType => {
    switch (action.type) {
        case 'SET_LOBBY_SIGNALR_SERVICE':
            return {
                ...state,
                lobbySignalRService: action.payload
            };
        case "SET_ROOMS_LIST":
            return {
                ...state,
                availableRooms: action.payload
            };
        case "ROOM_CREATED":
            return {
                ...state,
                availableRooms: [...state.availableRooms, action.payload]
            };
        case "ROOM_DELETED":
            return {
                ...state,
                availableRooms: state.availableRooms.filter((room) => room.id !== action.payload)
            };
        case "ROOM_UPDATED":
            return {
                ...state,
                availableRooms: state.availableRooms.map((room) => room.id === action.payload.id ? action.payload : room)
            };
        default:
            return state;
    }
}