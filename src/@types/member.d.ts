export interface MemberState {
    formData: FormData | null,
    error: {
        nick?: string[];
        email?: string[];
        pwd1?: string[];
        pwd2?: string[];
        server?: string;
    } | null;
};

// TODO Check à quoi sert exactement le "export" vu que ça a l'air de très bien s'exporter sans.
export interface NewMemberDto {
    nick: string;
    email: string;
    password: string;
};


export interface LogMemberDto {
    emailAddress: string,
    password: string,
};






