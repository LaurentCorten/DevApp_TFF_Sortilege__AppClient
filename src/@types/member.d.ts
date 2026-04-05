export type AuthFormState = {
    formData: FormData | null,
    error: {
        nick?: string[] | null,
        email?: string[] | null,
        pwd1?: string[] | null,
        pwd2?: string[] | null,
        server?: string | null
    } | null;
};

// TODO Check à quoi sert exactement le "export" vu que ça a l'air de très bien s'exporter sans.
export type MemberDto = {
    id?: string | null,
    nick?: string | null,
    email: string,
    password?: string | null
};

export type MemberState = {
    member: MemberDto | null,
    accessToken: string
};

export type MemberAction =
    | { type: "SET_MEMBER"; payload: MemberDto }
    | { type: "SET_ACCESS_TOKEN", payload: string }
    | { type: "LOG_MEMBER_OUT" }


