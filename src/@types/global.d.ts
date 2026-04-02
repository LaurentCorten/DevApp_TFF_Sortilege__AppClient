import type { ReactNode } from "react";

export interface GenericAuthorizedBtnPropsType {
    btnTxtContent: string,
    btnClass: string,
    ConfirmClick: () => void,
};

export interface Action {
    type: string;
    payload: any;
}

export interface GlobalStateProps {
    children: ReactNode;
}