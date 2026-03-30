import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { accessToken } from "../../atom/store";
import { useState } from "react";
import type { GenericAuthorizedBtnPropsType } from "../../@types/global";


export function GenericAuthorizedBtn({ btnTxtContent, btnClass, ConfirmClick }: GenericAuthorizedBtnPropsType) {

    const auth = useAtomValue(accessToken);
    const navigate = useNavigate();

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {

        // if (!auth) {
        //     navigate('/auth');
        // }

        setIsClicked(true);
        ConfirmClick(isClicked);
    };


    return (
        <>
            <button type="button" className={btnClass} onClick={() => handleClick()}>
                {btnTxtContent}
            </button>
        </>
    )
}
