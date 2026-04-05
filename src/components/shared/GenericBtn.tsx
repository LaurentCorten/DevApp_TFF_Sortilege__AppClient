import { useNavigate } from "react-router";
import type { GenericAuthorizedBtnPropsType } from "../../@types/global";
import { useGlobalState } from "../../context/Context";


export default function GenericAuthorizedBtn({ btnTxtContent, btnClass, ConfirmClick, isHidden, isDisabled }: GenericAuthorizedBtnPropsType) {

    const { memberState } = useGlobalState();
    const auth = memberState.accessToken;
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
