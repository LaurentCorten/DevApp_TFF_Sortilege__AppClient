import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { accessToken } from "../../atom/store";
import type { GenericAuthorizedBtnPropsType } from "../../@types/global";


export default function GenericAuthorizedBtn({ btnTxtContent, btnClass, ConfirmClick, isHidden, isDisabled }: GenericAuthorizedBtnPropsType) {

    const auth = useAtomValue(accessToken);
    const navigate = useNavigate();


    const handleClick = () => {
        if (!auth) {
            navigate('/auth');
        }
        ConfirmClick();
    };


    return (
        <>
            <button type="button" className={btnClass} onClick={() => handleClick()} hidden={isHidden} disabled={isDisabled}>
                {btnTxtContent}
            </button>
        </>
    )
}
