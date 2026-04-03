import type { LobbyStateType } from "./lobby";

export type GenericAuthorizedBtnPropsType = {
    btnTxtContent: string,
    btnClass: string,
    ConfirmClick: () => void,
};

export type GlobalStatePropsType = {
    children: React.ReactNode;
}

export type GlobalStateContextType = {
    lobbyState: LobbyStateType;
    lobbyDispatch: React.Dispatch<LobbyActionType>;
}

export type ServiceResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };