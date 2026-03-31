
export type OpenLobbyWindowType = { OpenLobbyWindow: (response: boolean) => void, };

export type RoomState = {
    formData: FormData | null,
    error: {
        name?: string[];
        server?: string;
    } | null
};

export type RoomCreationFormProps = {
    closed: boolean,
    CloseForm: () => void;
}

