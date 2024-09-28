import { getSession } from "next-auth/react";
import getAxios from "../axios";

export default async function updateTaskApi(bodyData){
    const session = await getSession();
    const axios = getAxios(session?.user)
    return await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, bodyData)
}