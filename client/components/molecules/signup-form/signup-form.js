import Button from "@/components/atoms/button/button"
import styles from "./signup-form.module.css"
import { useSetRecoilState } from "recoil"
import { isLoginComponent } from "@/utils/recoil-states"
import { useState } from "react"
import { isValidEmail } from "@/utils/helper"
import createUserApi from "@/apis/userApis/createUser"
import { cookie } from "@/apis/cookies"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignUpForm(){
    const setIsLogin = useSetRecoilState(isLoginComponent)
    const [userDetails,setUserDetails] = useState({})
    const [error,setError] = useState('')
    const router = useRouter()
    const { data: session } = useSession();

    function handleChange(value,key){
        setError('')
        setUserDetails({
            ...userDetails,
            [key] : value
        })
    }

    async function handleSubmit(){
        try{
            setError('')
            let {firstName='',lastName='',email='',password='',confirmPassword=''} = userDetails || {}
            firstName = firstName?.trim()
            lastName = lastName?.trim()
            email = email?.trim()
            password = password?.trim()
            confirmPassword = confirmPassword?.trim()
            console.log("1");
            
            if(!firstName || !lastName || !email || !password || !confirmPassword){
                setError("All fields are mandatory.")
                return
            }
            console.log("2");

            if(!isValidEmail(userDetails?.email)){
                setError("Pls Enter valid Email")
                return
            }
            console.log("3");

            if(userDetails?.password !== userDetails?.confirmPassword){
                setError("Password and confirm password must be the same.")
                return
            }
            console.log("4");

            if(error) return
            const data = await createUserApi({
                firstName : userDetails?.firstName?.trim(),
                lastName : userDetails?.lastName?.trim(),
                email : userDetails?.email?.trim(),
                password : userDetails?.password?.trim()
            })
            console.log("data",data);
            if(data){
                cookie.userToken = data
                router.push("/task")
            }
        }catch(error){
            console.log("error",error.message)
            setError(error.message)
        }
    }

    return(
        <div className={styles.wrapper}>
            <h1>Signup</h1>
            <div className={styles.formInputs}>
                <input
                    type="text"
                    placeholder="First Name"
                    className={styles.input}
                    onChange={(e)=>handleChange(e.target.value,"firstName")}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className={styles.input}
                    onChange={(e)=>handleChange(e.target.value,"lastName")}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    onChange={(e)=>handleChange(e.target.value,"email")}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    onChange={(e)=>handleChange(e.target.value,"password")}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className={styles.input}
                    onChange={(e)=>handleChange(e.target.value,"confirmPassword")}
                />
                {error && <p className={styles.errorMsg}>{error}</p>}
                <Button text="Sign Up" customStyle={styles.loginBtn} handleClick={()=>handleSubmit()}/>
                <p className={styles.signUp}>Already have an account? <span onClick={()=>setIsLogin(true)}>Login</span></p>
                <Button text="Continue With Google" customStyle={styles.gogleBtn} handleClick={()=>signIn("google")}/>
            </div>
        </div>
    )
}