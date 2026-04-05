import axios from 'axios';
import type { Room } from "../../@types/lobby";
import type { ServiceResult } from "../../@types/global";

const API_URL = import.meta.env.VITE_API_URL;

export async function JoinLobby(connectionId: string, accessToken: string): Promise<ServiceResult<void>> {

    let result;

    try {
        result = await axios.post(
            '/lobby',
            JSON.stringify(connectionId),
            {
                baseURL: API_URL,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
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

export async function PushNewRoom(name: string, connectionId: string, accessToken: string): Promise<ServiceResult<Room>> {

    let result;

    try {
        result = await axios.post<Room>(
            '/Room',
            { roomName: name, connectionId: connectionId },
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

export async function PullRoomsList(accessToken: string): Promise<ServiceResult<Room[]>> {

    let result;

    try {
        result = await axios.get<Room[]>(
            '/Room',
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

export async function JoinRoom(roomId: string, connectionId: string, accessToken: string): Promise<ServiceResult<Room>> {

    let result;

    try {
        result = await axios.put<Room>(
            '/Room/join',
            { roomId: roomId, connectionId: connectionId },
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

export async function LeaveRoom(roomId: string, connectionId: string, accessToken: string): Promise<ServiceResult<Room>> {

    let result;

    try {
        result = await axios.put<Room>(
            '/Room/leave',
            { roomId: roomId, connectionId: connectionId },
            {
                baseURL: API_URL,
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

export async function DeleteRoom(roomId: string, connectionId: string, accessToken: string): Promise<ServiceResult<void>> {

    let result;

    try {
        result = await axios.delete(
            '/Room/delete',
            {
                baseURL: API_URL,
                headers: { Authorization: `Bearer ${accessToken}` },
                data: { roomId: roomId, connectionId: connectionId }
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