import axios from 'axios';
import type { MemberDto } from '../../@types/member';

const API_URL = import.meta.env.VITE_API_URL;


export async function PushRegistration(newMember: MemberDto){

    let result;

    try {
        result = await axios.post(
            '/Member/register',
            {name: newMember.nick, emailAddress: newMember.email, password: newMember.password},
            {baseURL: API_URL});
    }
    catch (error: any) {
        const msg = error.result.data?.detail;

        return {
            success: false,
            error: msg ?? error.message
        }
    }

    return {
        success: true,
        data: result.data
    };
}