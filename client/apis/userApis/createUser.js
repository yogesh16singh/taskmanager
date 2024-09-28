import { getSession } from 'next-auth/react'; 
import getAxios from '../axios';

export default async function createUserApi(bodyData){
    console.log("10");

    const session = await getSession();
    const axios = getAxios(session?.user)
    console.log("11");
    console.log("bodydata",bodyData);
    
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, bodyData)
}