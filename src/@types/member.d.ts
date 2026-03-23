export type MemberState = {
    formData: FormData | null,
    error: {
        nick?: string[];
        email?: string[];
        pwd1?: string[];
        pwd2?: string[];
        server?: string;
    } | null;
};

type NewMemberDto = {
    nick: string | null;// TODO : Check : Vu que <input> tjs string, null en fait impossible, tjs au pir une empty string, non ? Du coup nullable utile ?
    email: string;
    password: string;
};


type LogMemberDto = {
    emailAddress: string,
    password: string,
};
// TODO Check : En Ts les , semble remplacable par des ; qu'en est-il ???