import { useActionState } from "react";
import z from "zod";
import type { RoomCreationFormProps, RoomState } from "../../@types/rooms";
import clsx from "clsx";
import style from "./Lobby.module.css";
import { PushNewRoom } from "../../services/lobby/lobby.service";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAtomValue } from "jotai";
import { accessToken } from "../../atom/store";



// Validation Scheme (zod)
const NewRoomScheme =
    z.object({
        name: z.string()
            .trim()
            .min(5, { error: "Le nom de salon doit faire au moins 5 caractères !" })
            .max(50, { error: "Le nom du salon ne peut pas excéder 50 caractères !" })
    });


// Main Function
export default function RoomCreationForm({ closed, CloseForm }: RoomCreationFormProps) {

    console.log(`closed = ${closed}`);
    const auth = useAtomValue(accessToken);
    const navigate = useNavigate();

    // Handle form action submit
    const onNewRoomSubmit = async (_state: RoomState, formData: FormData): Promise<RoomState> => {
        if (!auth) {
            navigate('/auth');
        }


        //data validation w. zod
        const { data, error, success } = await NewRoomScheme.safeParseAsync(Object.fromEntries(formData.entries()));

        // Validation Error handling
        if (!success) {
            return {
                formData,
                error: z.flattenError(error).fieldErrors
            };
        }

        // Service calling
        const result = await PushNewRoom(data.name);

        // Check dev
        console.log(data, result);

        if (result.success) {
            toast.success(`Room ${result.data.id} bien crée !`);

            return {
                formData: null,
                error: null
            };
        } else {
            toast.error(result.error);

            return {
                formData,
                error: {
                    server: result.error
                }
            };
        }
    };


    // Handle Cancel
    const onCancelClick = () => {
        CloseForm();
    };


    const [state, handleSubmit, isPending] = useActionState(onNewRoomSubmit, { formData: null, error: null });

    return (
        <form hidden={closed} className={clsx(style["newRoomForm-container"], "stone-panel")} action={handleSubmit}>
            <div className={style["newRoomInputs-container"]}>
                <label htmlFor="name">Nom du salon : </label>
                <input name="name" type="text" className="stone-bar" defaultValue={state.formData?.get("name")?.toString()} />
                {state.error?.name && <span>{state.error.name.join(", ")}</span>}
            </div>
            <div className={style["newRoomBtns-container"]}>
                <button disabled={isPending} className={clsx(style['newRoomForm-btn'], "stone-btn")} type='submit'>Créer le salon</button>
                <button disabled={isPending} className={clsx(style['newRoomForm-btn'], "stone-btn")} type="button" onClick={onCancelClick} >Annuler</button>
            </div>
            {state.error?.server && (<span>{state.error.server}</span>)}
        </form>
    );
}