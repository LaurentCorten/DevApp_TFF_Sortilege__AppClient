import axios from 'axios';
import type { MemberDto } from '../../@types/member';
import type { ServiceResult } from "../../@types/global";

const API_URL = import.meta.env.VITE_API_URL;


export async function PushRegistration(newMember: MemberDto): Promise<ServiceResult<string>> {

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

export async function PushLogin(logMember: MemberDto): Promise<ServiceResult<any>> { // TODO: Faire un LoginResponseDto propre !

    let result;

    try {
        result = await axios.post(
            '/Member/Login',
            { emailAddress: logMember.email, password: logMember.password },
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

export async function GetMemberByToken(accessToken: string): Promise<ServiceResult<MemberDto>> {

    let result;

    try {
        result = await axios.get(
            '/Member',
            {
                baseURL: API_URL,
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        )
    } catch (error: any) {

        // Network error — no response from server
        if (!error.response) {
            return { success: false, error: "Erreur réseau", statusCode: undefined };
        }

        // Server responded with an error status (401, 403, 500...)
        return {
            success: false,
            error: error.response.data ?? error.message,
            statusCode: error.response.status
        };
    }

    console.log(result);

    return {
        success: true,
        data: result.data
    };

}