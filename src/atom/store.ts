import { atomWithStorage } from "jotai/utils";


export const accessToken = atomWithStorage<string | null>('aToken', null);
export const refreshToken = atomWithStorage<string | null>('rToken', null);