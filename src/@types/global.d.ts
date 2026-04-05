import type React from "react";
import type { LobbyStateType } from "./lobby";
import type { MemberAction, MemberState } from "./member";

export type GenericAuthorizedBtnPropsType = {
    btnTxtContent: string,
    btnClass: string,
    ConfirmClick: () => void,
    isHidden: boolean,
    isDisabled: boolean
};

export type GlobalStatePropsType = {
    children: React.ReactNode
};

export type GlobalStateContextType = {
    memberState: MemberState,
    memberDispatch: React.Dispatch<MemberAction>,
    lobbyState: LobbyStateType,
    lobbyDispatch: React.Dispatch<LobbyActionType>
};

export type ServiceResult<T> =
    | { success: true; data: T }
    | { success: false; error: string; statusCode?: number };