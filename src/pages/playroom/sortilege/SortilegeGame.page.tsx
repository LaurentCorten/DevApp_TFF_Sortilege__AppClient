import { useParams } from "react-router";


export default function SortilegeGamePage() {

    const { roomId } = useParams();

    return (

        <>
            <h3>Ça Joue à la room `{roomId}`!</h3>
        </>
    )
}