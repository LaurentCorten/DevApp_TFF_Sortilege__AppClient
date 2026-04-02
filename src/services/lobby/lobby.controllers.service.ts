import axios from 'axios';
// import type { } from '../../@types/rooms';
import { accessToken, store } from "../../atom/store";

const API_URL = import.meta.env.VITE_API_URL;



export async function PushNewRoom(name: string) {


    const token = store.get(accessToken);
    let result;

    try {
        result = await axios.post(
            '/Room',
            { roomName: name },
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