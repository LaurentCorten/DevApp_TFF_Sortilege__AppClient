import { useAtom } from "jotai";
import { activeToken } from "../../atom/store";
import { useNavigate } from "react-router";


export default function AuthBtn () {

    const [auth, setAuth] = useAtom(activeToken);
const navigate = useNavigate();

    const authBtnAction = () => {
        if(auth){
            setAuth(null);
            navigate('/');
        } else {
            navigate('/auth')
        }
    };

return (
    <button onClick={authBtnAction}>
        {auth ? 'Se déconnecter' : 'Se connecter'}
    </button>
);

}