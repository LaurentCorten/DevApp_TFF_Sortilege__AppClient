import { useAtomValue } from "jotai";
import { activeToken } from "../../atom/store";
import { Navigate } from "react-router";


export default function ProfilePage() {

    const auth = useAtomValue(activeToken);

    if (!auth) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <>
            <h1>Page de Gestion de Profil</h1>
        </>
    );
}