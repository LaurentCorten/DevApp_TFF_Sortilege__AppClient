import axios from 'axios';
import type { } from '../../@types/rooms';

const API_URL = import.meta.env.VITE_API_URL;



export async function PushNewRoom(name: string) {


    console.log(name);

    return {
        success: true,
        data: name
    }
}