import { Navigate } from "react-router";
import { useGlobalState } from "../../context/Context";


export default function ProfilePage() {

    const { memberState } = useGlobalState();
    const auth = memberState.accessToken;

    if (!auth) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <>
            <h2>Page de Gestion de Profil</h2>
        </>
    );
}