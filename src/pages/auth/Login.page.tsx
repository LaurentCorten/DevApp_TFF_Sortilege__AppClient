import { useActionState } from "react";
import { Link, Navigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import type { AuthFormState, MemberDto } from "../../@types/member";
import { PushLogin } from "../../services/auth/auth.service";
import style from "./Auth.module.css";
import { useGlobalState } from "../../context/Context";

const LogMemberScheme =
    z.object({
        email: z.email({ error: "L'adresse email n'a pas un format valide !" })
            .toLowerCase(),
        pwd1: z.string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, { error: "Le mot de passe doit contenir minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre" }),
    });

export default function LoginPage() {

    const { memberState, memberDispatch } = useGlobalState();
    const loginAction = async (_state: AuthFormState, formData: FormData): Promise<AuthFormState> => {

        const { data, error, success } = await LogMemberScheme.safeParseAsync(Object.fromEntries(formData.entries()));

        // Error handling
        if (!success) {
            return {
                formData,
                error: z.flattenError(error).fieldErrors
            };
        }

        const logMember: MemberDto = {
            email: data.email,
            password: data.pwd1,
        };

        const result = await PushLogin(logMember);

        // console.log(logMember, result);

        if (result.success) {
            toast.success(result.data.message);
            memberDispatch({ type: "SET_MEMBER", payload: result.data.member });
            memberDispatch({ type: "SET_ACCESS_TOKEN", payload: result.data.token });
            localStorage.setItem("accessToken", result.data.token);

            return {
                formData: null,
                error: null
            };
        } else {
            toast.error(result.error);
            console.log(result.error);

            return {
                formData: null,
                error: {
                    server: result.error
                }
            };
        }

    };

    const [state, handleSubmit, isPending] = useActionState(loginAction, { formData: null, error: null });

    if (memberState.accessToken) {
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
                <button disabled={isPending} className={style['btn']} type='submit'>Se connecter</button>
                {state.error?.server && (<span>{state.error?.server}</span>)}
            </form>
            <div>
                <p>Pas encore Inscrit ?</p>
                <Link to='register'><button className={style['btn']}>Inscrivez-vous ici !</button></Link>
            </div>
        </section>
    );
}