import Button from "@/components/atoms/button/button"
import styles from "./login-form.module.css"
import {  useSetRecoilState } from "recoil"
import { isLoginComponent } from "@/utils/recoil-states"
import { useState } from "react"
import loginUserApi from "@/apis/userApis/loginUser"
import { isValidEmail } from "@/utils/helper"
import { useRouter } from "next/navigation"
import { cookie } from "@/apis/cookies"
import { signIn } from "next-auth/react"
import { flushSync } from "react-dom"

export default function LoginForm(){
    const setIsLogin = useSetRecoilState(isLoginComponent)
    const [userDetails,setUserDetails] = useState({})
    const [errorMsg,setErrorMsg] = useState('')
    const [isSubmitting,setIsSubmitting] = useState(false)
    const router = useRouter()
    
    function handleChange(key,value){
        setErrorMsg('')
        setUserDetails({
            ...userDetails,
            [key] : value
        })
    }

    function setSubmit(status){
        flushSync(()=>setIsSubmitting(status))
    }
    async function handleSubmit(){
        try{
            if(isSubmitting) return
            setSubmit(true)
            const {email,password} = userDetails || {}
            if(!email || !password){
                setErrorMsg("Email and password are required.")
                setSubmit(false)
                return
            }
            if(!isValidEmail(email)){
                setErrorMsg("Please enter a valid email.")
                setSubmit(false)
                return
            }
            const data = await loginUserApi(userDetails)
            console.log("login",data);
            if(data.status){
                cookie.userToken = data.data
                router.push("/task")
            }
        }catch(error){
            console.log(error.message)
            setErrorMsg(error.message)
        }finally{
            setSubmit(false)
        }
    }

    return(
        <div className={styles.wrapper}>
            <h1>Login</h1>
            <div className={styles.formInputs}>
                <input
                    type="text"
                    placeholder="Email"
                    className={styles.input}
                    onChange={(e)=>handleChange("email",e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={(e)=>handleChange("password",e.target.value)}
                />
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <Button text={isSubmitting ? "Proceeding..." :"Login"} customStyle={styles.loginBtn} handleClick={()=>handleSubmit()}/>
                <p className={styles.signUp}>Don&apos;t have an account? <span onClick={()=>setIsLogin(false)}>SignUp</span></p>
                <Button text="Continue With Google" customStyle={styles.gogleBtn} handleClick={()=>signIn("google")}/>
            </div>
        </div>
    )
}