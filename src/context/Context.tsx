import { createContext, useContext, useReducer } from "react";
import type { LobbyStateType } from "../@types/lobby";
import type { GlobalStateContextType, GlobalStatePropsType } from "../@types/global";
import { lobbyReducer } from "./Reducer";
import { LobbySignalRService } from "../services/lobby/lobby.signalR.service";



const initialLobbyState: LobbyStateType = {
    lobbySignalRService: null,
    avalaibleRooms: []
}

export const GlobaleStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Custom hook to consume the GlobalStateContext avoiding silent error 
export function useGlobalState(): GlobalStateContextType {
    const context = useContext(GlobaleStateContext);

    // Gard to avoid using that hook outside of the provider
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }

    return context;
}

export function GlobalStateProvider({ children }: GlobalStatePropsType) {

    const [lobbyState, lobbyDispatch] = useReducer(lobbyReducer, initialLobbyState)



    return (
        <GlobaleStateContext.Provider value={{ lobbyState, lobbyDispatch }}>
            {children}
        </GlobaleStateContext.Provider>
    )
}
