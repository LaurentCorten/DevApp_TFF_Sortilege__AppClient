import { useActionState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import type { LogMemberDto, MemberState } from "../../@types/member";
import { PushLogin } from "../../services/auth/auth.service";
import { useAtom } from "jotai";
import { activeToken } from "../../atom/store";
import style from "./Auth.module.css";

const LogMemberScheme =
    z.object({
        email: z.email({ error: "L'adresse email n'a pas un format valide !" })
            .toLowerCase(),
        pwd1: z.string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, { error: "Le mot de passe doit contenir minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre" }),
    });



export default function LoginPage() {

    const [token, setToken] = useAtom(activeToken);

    const loginAction = async (_state: MemberState, formData: FormData): Promise<MemberState> => {

        const { data, error, success } = await LogMemberScheme.safeParseAsync(Object.fromEntries(formData.entries()));

        // Error handling
        if (!success) {
            return {
                formData,
                error: z.flattenError(error).fieldErrors
            };
        }

        const logMember: LogMemberDto = {
            emailAddress: data.email,
            password: data.pwd1,
        };

        const result = await PushLogin(logMember);

        // console.log(logMember, result);

        if (result.success) {
            toast.success(result.data.message);

            setToken(result.data.token);

            return {
                formData: null,
                error: null
            };
        } else {
            toast.error(result.error);

            return {
                formData: null,
                error: result.error
            };
        }

    };


    const [state, handleSubmit, isPending] = useActionState(loginAction, { formData: null, error: null });

    if (token) {
        return <Navigate to='/' replace />;
    }

    return (
        <section className={style["form-container"]}>
            <h2>Connection</h2>
            <form className={style['form']} action={handleSubmit}>
                <div>
                    <label htmlFor={"email"}>Email* : </label>
                    <input type="email" id={'email'} name='email' placeholder='ex: user@example.com' required />
                    {state.error?.email && (<span>{state.error.email.join(', ')}</span>)}
                </div>
                <div>
                    <label htmlFor={'pwd'}>Mot de Passe* :</label>
                    <input type='password' id={'pwd1'} name='pwd1' placeholder='ex: Test123!' required />
                    {state.error?.pwd1 && (<span>{state.error.pwd1.join(', ')}</span>)}
                </div>
                <button disabled={isPending} className={style['btn-form']} type='submit'>Se connecter</button>
                {state.error?.pwd1 && (<span>{state.error?.pwd1}</span>)}
            </form>
            <p>
                Pas encore Inscrit ?
                <Link to='register'><button className={style['btn-link']}>Inscrivez-vous ici !</button></Link>
            </p>
        </section>
    );
}