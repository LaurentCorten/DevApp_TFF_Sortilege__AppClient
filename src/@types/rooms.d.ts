import type { ZodGUID } from "zod";

export interface OpenLobbyWindowType { OpenLobbyWindow: (response: boolean) => void, };

export interface NewRoomState {
    formData: FormData | null,
    error: {
        name?: string[];
        server?: string;
    } | null
};

export interface NewRoomFormProps {
    closed: boolean,
    CloseForm: () => void;
}

export interface Room {
    Id: ZodGUID;
    Name: string;
    CreatorId: ZodGUID;
    GuestId?: ZodGUID | null;
    CreationDate: Date;
}

