import axios from 'axios';
import { accessToken, store } from "../../atom/store";
import type { Room } from "../../@types/lobby";
import type { ServiceResult } from "../../@types/global";

const API_URL = import.meta.env.VITE_API_URL;

export async function JoinLobby(connectionId: string): Promise<ServiceResult<void>> {

    const token = store.get(accessToken);
    let result;

    try {
        result = await axios.post(
            '/lobby',
            JSON.stringify(connectionId),
            {
                baseURL: API_URL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error: any) {
        const msg = error.response.data;
        console.log(`msg = ${msg}`);

        return {
            success: false,
            error: msg ?? error.message
        };
    }
    console.log(result);

    return {
        success: true,
        data: result.data
    };
}

export async function PushNewRoom(name: string, connectionId: string): Promise<ServiceResult<Room>> {

    const token = store.get(accessToken);
    let result;

    try {
        result = await axios.post<Room>(
            '/Room',
            { roomName: name, connectionId: connectionId },
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error: any) {
        const msg = error.response.data;
        console.log(`msg = ${msg}`);

        return {
            success: false,
            error: msg ?? error.message
        };
    }

    console.log(result);

    return {
        success: true,
        data: result.data
    };
}

export async function PullRoomsList(): Promise<ServiceResult<Room[]>> {

    const token = store.get(accessToken);
    let result;

    try {
        result = await axios.get<Room[]>(
            '/Room',
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
    } catch (error: any) {
        const msg = error.response.data;
        console.log(`msg = ${msg}`);

        return {
            success: false,
            error: msg ?? error.message
        };
    }

    console.log(result);

    return {
        success: true,
        data: result.data
    };
}
