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
    nick: string;
    email: string;
    password: string;
};


type LogMemberDto = {
    emailAddress: string,
    password: string,
};






