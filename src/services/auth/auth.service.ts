import axios from 'axios';
import type { NewMemberDto, LogMemberDto } from '../../@types/member';

const API_URL = import.meta.env.VITE_API_URL;


export async function PushRegistration(newMember: NewMemberDto) {

    let result;

    try {
        result = await axios.post(
            '/Member/register',
            { name: newMember.nick, emailAddress: newMember.email, password: newMember.password },
            { baseURL: API_URL });
    }
    catch (error: any) {
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

export async function PushLogin(logMember: LogMemberDto) {

    let result;

    try {
        result = await axios.post(
            '/Member/Login',
            { ...logMember },
            { baseURL: API_URL });
    }
    catch (error: any) {
        const msg = error.response.data;
        console.log(`msg = ${msg}`);

        return {
            success: false,
            error: msg ?? error.message
        };
    }

    return {
        success: true,
        data: result.data
    };
}