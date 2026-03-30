import { useAtomValue } from "jotai";
import { accessToken } from "../../atom/store";
import { Navigate } from "react-router";


export default function ProfilePage() {

    const auth = useAtomValue(accessToken);

    if (!auth) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <>
            <h2>Page de Gestion de Profil</h2>
        </>
    );
}