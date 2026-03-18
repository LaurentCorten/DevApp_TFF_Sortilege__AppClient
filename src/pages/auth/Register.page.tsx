import { useActionState } from "react";
import z from 'zod';


// Validation Scheme (zod)
const MemberDataScheme =
    z.object({
        nick: z.string()
            .trim()
            .min(3, { error: 'Un pseudo doit faire entre 3 et 50 caractères !' })
            .max(50, { error: 'Un pseudo doit faire entre 3 et 50 caractères !' })
            .nullable(),
        email: z.email({ error: "L'adresse email n'a pas un format valide !" })
            .toLowerCase(),
        pwd1: z.string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, { error: "Le mot de passe doit contenir minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre" }),
        pwd2: z.string()
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/, { error: "Le mot de passe doit contenir minimum 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre" }),
    })
        .refine((data) => data.pwd1 === data.pwd2, { error: "Les mots de passe ne sont pas identiques", path: ['pwd2'] });

// Componant
type MemberState = {
    formData: FormData | null,
    error: {
        nick?: string[];
        email?: string[];
        pwd1?: string[];
        pwd2?: string[];
    } | null;
};


export default function RegisterPage() {

    // form Action
    const onRegisterSubmit = async (state: MemberState, formData: FormData) => {

        //data validation w. zod
        const { data, error, success } = MemberDataScheme.safeParseAsync(Object.fromEntries(formData.entries())); // TODO : Check si mettre async est un bon plan ou pas ?


        // Error handling
        if (!success) {
            return {
                formData,
                error: z.flattenError(error).fieldErrors
            };
        }

        // Service calling
        //* const result = PostNewMember(data);

        return {
            formData: null,
            error: null
        };
    };

    // Utilisation

    const [state, handleSubmit, isPending] = useActionState(onRegisterSubmit, { formData: null, error: null });

    return (
        <form className='form' action={handleSubmit}>
            <div>
                <label htmlFor='nick'>Pseudo : </label>
                <input type='text' id='nick' name='nick' />
            </div>
            <div>
                <label htmlFor="email">Email* : </label>
                <input type="email" id='email' name='email' placeholder='ex: user@example.com' required />
            </div>
            <div>
                <label htmlFor='pwd1'>Choix du Mot de Passe* :</label>
                <input type='text' id='pwd1' name='pwd1' placeholder='min 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre' required />
            </div>
            <div>
                <label htmlFor='pwd2'>Confirmation du Mot de Passe* :</label>
                <input type='text' id='pwd2' name='pwd2' placeholder='min 8 caractères dont au moins 1 Majuscule, 1 minuscule, 1 chiffre et 1 autre' required />
            </div>
            <button disabled={isPending} className='btn-form' type='submit'>S'enregistrer</button>
        </form>
    );
} 