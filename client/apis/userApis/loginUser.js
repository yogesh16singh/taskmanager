import { getSession } from "next-auth/react";
import getAxios from "../axios";

export default async function loginUserApi(bodyData){
    const session = await getSession();
    const axios = getAxios(session?.user)
    return await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, bodyData)
}