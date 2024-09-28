import { getSession } from "next-auth/react";
import getAxios from "../axios";

export default async function deleteTaskApi(bodyData){
    const session = await getSession();
    const axios = getAxios(session?.user)
    return await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, {
        data : bodyData
    })
}