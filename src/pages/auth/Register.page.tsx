import { useActionState } from "react";

const INITIAL_Member_STATE = {
    data: { nick: '', email: '', password: '' },
    error: null,
};
export default function RegisterPage() {

    const PostNewMember = async (INITIAL_STATE, formData) => {
        // TODO: récup du formulaire
    };

    const [state, handleSubmit, isPending] = useActionState(PostNewMember, INITIAL_Member_STATE);

    return (
        <form className='form' action={handleSubmit}>
            // TODO: contenu formulaire

        </form>
    );
} 