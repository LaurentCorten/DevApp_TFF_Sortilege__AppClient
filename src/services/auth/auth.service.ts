import axios from 'axios';
import type { MemberDto } from '../../@types/member';


export async function PushRegistration(newMember: MemberDto){
    const result = await axios.post('https://localhost:7179/api/Member/register', {name: newMember.nick, emailAddress: newMember.email, password: newMember.password})

    return result.data;
}