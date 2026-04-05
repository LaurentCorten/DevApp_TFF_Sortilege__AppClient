import { createContext, useContext, useEffect, useReducer } from "react";
import type { LobbyStateType } from "../@types/lobby";
import type { GlobalStateContextType, GlobalStatePropsType } from "../@types/global";
import { lobbyReducer, memberReducer } from "./Reducer";
import type { MemberState } from "../@types/member";
import { GetMemberByToken } from "../services/auth/auth.service";
import { toast } from "sonner";

const initialMemberState: MemberState = {
    member: null, // TODO: faire un call pour récupérer le membre si accessToken !
    accessToken: localStorage.getItem("accessToken") ?? ""
};

const initialLobbyState: LobbyStateType = {
    lobbySignalRService: null,
    availableRooms: []
};

export const GlobaleStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Custom hook to consume the GlobalStateContext avoiding silent error 
export function useGlobalState(): GlobalStateContextType {
    const context = useContext(GlobaleStateContext);

    // Guard to avoid using that hook outside of the provider
    if (context === undefined) {
        throw new Error("useGlobalState must be used within a GlobalStateProvider");
    }
    return context;
}

export function GlobalStateProvider({ children }: GlobalStatePropsType) {

    const [memberState, memberDispatch] = useReducer(memberReducer, initialMemberState);
    const [lobbyState, lobbyDispatch] = useReducer(lobbyReducer, initialLobbyState);

    useEffect(() => {
        // Runs once on mount — rehydrate member from token if available
        const rehydrateMember = async () => {
            if (!memberState.accessToken) return;

            const result = await GetMemberByToken(memberState.accessToken);
            if (result.success) {
                memberDispatch({ type: "SET_MEMBER", payload: result.data });
                return;
            }

            // Logout on explicit auth rejection
            if (result.statusCode === 401 || result.statusCode === 403) {
                memberDispatch({ type: "LOG_MEMBER_OUT" });
                return;
            }

            // Network error or server error — keep the token, try again later
            toast.error("Could not rehydrate member: ${result.error}");
            console.error("Could not rehydrate member:", result.error);

        };
        rehydrateMember();
    }, []);


    return (
        <GlobaleStateContext.Provider value={{ memberState, memberDispatch, lobbyState, lobbyDispatch }}>
            {children}
        </GlobaleStateContext.Provider>
    )
}
