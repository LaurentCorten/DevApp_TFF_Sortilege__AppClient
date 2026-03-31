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

// TODO Check à quoi sert exactement le "export" vu que ça a l'aire de très bien s'exporter sans.
type NewMemberDto = {
    nick: string;
    email: string;
    password: string;
};


type LogMemberDto = {
    emailAddress: string,
    password: string,
};






