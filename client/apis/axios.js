import axios  from "axios";
import { cookie } from "./cookies";

function getAxios(user={}) {
    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    function onRequestFulfilled(request) {
        const authToken = cookie.userToken;
        if (authToken) request.headers["x-auth-token"] = authToken;
        const {email =''} = user || {}
        if(email){
            request.headers["x-auth-type"] = "google"
            request.headers['x-auth-email'] = email
        }
        return request;
    }

    function onRequestRejected(error) {
        console.log("reject");
        
        // console.error('onRequestRejected', error.response)
        // Do something with request error
        // Retry code, internet connectivity check
        return Promise.reject(new Error(error?.response?.data?.msg));
    }

    function onResponseFulfilled(response) {
        console.log("response",response);

        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // console.log("onResponseFulfilled", response);
        const {
            data,
            status,
            config: { url }
        } = response || {data:{}};

        if (!status) {
            return Promise.reject(new Error(msg));
        }
        return data;
    }


    function onResponseRejected(error) {
        // Do something with response error
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // console.error('onResponseRejected', error.response)
        const {status} = error?.response || {}
        const {msg,message, code} = error?.response?.data || {}
        const responseMessage = message || msg;
        const unAuthorisedMsgs = [
            'TOKEN_NOT_FOUND',
            'INVALID_TOKEN_CONTENT',
            'UNAUTHORISED_USER',
            'INVALID_TOKEN'
        ]

        if(unAuthorisedMsgs.includes(responseMessage)){
            cookie.clearAllCookies();
            window?.open('/', '_self')
            return
        }
        const errorObj = new Error(responseMessage)
        errorObj.status = status
        return Promise.reject(errorObj);
    }


    axiosInstance.interceptors.request.use(onRequestFulfilled, onRequestRejected, {synchronous: true })
    axiosInstance.interceptors.response.use(onResponseFulfilled, onResponseRejected, { synchronous: true })

    return axiosInstance
}

let axiosInstance = null

if (!axiosInstance) {
    axiosInstance = getAxios()
}
    
export default getAxios


