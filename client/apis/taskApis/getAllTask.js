import { getSession } from 'next-auth/react'; 
import getAxios from '../axios';


export default async function getAllTaskApi(queryData,sortBy='desceding'){
    const session = await getSession();
    const axios = getAxios(session?.user)
    return await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/task`, {
        params : {
            ...(queryData && {search : queryData}),
            sortBy
        }
    })
}