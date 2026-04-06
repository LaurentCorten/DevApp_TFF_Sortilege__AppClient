import { useActionState } from "react";
import z from 'zod';
import { PushRegistration } from '../../services/auth/auth.service';
import { toast } from "sonner";
import { Link } from "react-router";
import type { AuthFormState, MemberDto } from "../../@types/member";
import style from "./Auth.module.css";
import clsx from "clsx";



// Validation Scheme (zod)
const NewMemberScheme =
    z.object({
        nick: z.string()
            .trim()
            .max(50, { error: 'Un pseudo doit faire entre 3 et 50 caractères !' }),
        email: z.email({ error: "L'adresse email n'a pas un format valide !" })
            .toLowerCase(),
        pwd1: z.string() // TODO : Check comment aller à la ligne pour l'erreur
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, { error: "Le mot de passe doit contenir minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre" }),
        pwd2: z.string(),
    })
        .refine((data) => data.pwd1 === data.pwd2, { error: "Les mots de passe ne sont pas identiques", path: ['pwd2'] });

// Main function
export default function RegisterPage() {

    // form Action
    const onRegisterSubmit = async (_state: AuthFormState, formData: FormData): Promise<AuthFormState> => {

        //data validation w. zod
        const { data, error, success } = await NewMemberScheme.safeParseAsync(Object.fromEntries(formData.entries()));


        // Error handling
        if (!success) {
            return {
                formData,
                error: z.flattenError(error).fieldErrors
            };
        }

        // Mapping
        const newMember: MemberDto = {
            nick: data.nick,
            email: data.email,
            password: data.pwd1,
        };

        // Service calling
        const result = await PushRegistration(newMember);

        // Check dev
        console.log(newMember, result);

        if (result.success) {
            toast.success(result.data.message);

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

    // Utilisation

    const [state, handleSubmit, isPending] = useActionState(onRegisterSubmit, { formData: null, error: null });

    return (
        <section className={clsx(style["form-container"], "stone-panel-800")}>
            <h2>Inscritions</h2>
            <form className={style['form']} action={handleSubmit}>
                <div>
                    <label htmlFor={'nick'}>Pseudo : </label>
                    <input className="stone-input" type='text' id={'nick'} name='nick' defaultValue={state.formData?.get('nick')?.toString()} />
                    {state.error?.nick && (<span>{state.error.nick.join(', ')}</span>)}
                </div>
                <div>
                    <label htmlFor={"email"}>Email* : </label>
                    <input className="stone-input" type="email" id={'email'} name='email' placeholder='ex: user@example.com' required defaultValue={state.formData?.get('email')?.toString()} />
                    {state.error?.email && (<span>{state.error.email.join(', ')}</span>)}

                </div>
                <div>
                    <label htmlFor={'pwd1'}>Choix du Mot de Passe* :</label>
                    <input className="stone-input" type='password' id={'pwd1'} name='pwd1' placeholder='ex: Test123!' required />
                    {state.error?.pwd1 && (<span>{state.error.pwd1.join(', ')}</span>)}
                </div>
                <div>
                    <label htmlFor={'pwd2'}>Confirmation du Mot de Passe* :</label>
                    <input className="stone-input" type='password' id={'pwd2'} name='pwd2' placeholder='ex: Test123!' required />
                    {state.error?.pwd2 && (<span>{state.error.pwd2.join(', ')}</span>)}
                </div>
                <button disabled={isPending} className={clsx(style['btn'], "stone-btn")} type='submit'>S'enregistrer</button>
                {state.error?.server && (<span>{state.error.server}</span>)}
            </form>
            <div>
                <p>Déjà Inscrit ?</p>
                <Link to='../'><button className={clsx(style['btn'], "stone-btn")}>Connectez-vous ici !</button></Link>
            </div>
        </section >
    );
} 