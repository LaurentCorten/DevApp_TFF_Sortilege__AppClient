import { useAtomValue } from "jotai";
import { activeToken } from "../../atom/store";
import { Navigate } from "react-router";


export default function ArenaPage() {

    const auth = useAtomValue(activeToken);

    if (!auth) {
        return <Navigate to="/auth" replace />;
    }


    return (
        <>
            <h2>Page du Jeu en Lui-Même</h2>
        </>
    );
}