'use client'
import Header from "@/components/molecules/header";
import LoginForm from "@/components/molecules/login-form/login-form";
import styles from "./login.module.css"
import SignUpForm from "@/components/molecules/signup-form/signup-form";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoginComponent } from "@/utils/recoil-states";

export default function LoginPage(){
   
    const isLogin = useRecoilValue(isLoginComponent)
    return (
        <div>
            <Header/>
            <div className={styles.loginFormWrapper}>
                {isLogin && <LoginForm />}
                {!isLogin && <SignUpForm/>}
            </div>
        </div>
    )
}