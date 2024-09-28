import styles from "./header.module.css"
import EventNoteIcon from '@mui/icons-material/EventNote';
import Button from "@/components/atoms/button/button";
import { useRecoilState } from "recoil";
import { isLoginComponent } from "@/utils/recoil-states";
import { cookie } from "@/apis/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from 'next-auth/react';

export default function Header(){
    const [isLogin,setIsLoggin] = useRecoilState(isLoginComponent)
    const { data: session, status } = useSession();
    const [token, setToken] = useState(null);
    const router = useRouter()
    const isGoogleLoggedIn = status === 'authenticated'
    useEffect(() => {
        setToken(cookie.userToken);
    }, []);

    async function handleLogout(){
        if(isGoogleLoggedIn){
            await signOut({ redirect: true, callbackUrl: '/' });
            return
        }
        cookie.clearAllCookies()
        router.push('/')
    }

    return(
        <header className={styles.mainWrapper}>
            <picture>
                <EventNoteIcon style={{color:"#fff", fontSize:"2rem"}} />
            </picture>
            {(!token && !isGoogleLoggedIn)&& 
            <div className={styles.btnWrapper}>
                <Button text="Login" isPrimaryBtn={isLogin ? false : true} handleClick={()=>setIsLoggin(true)}/>
                <Button text="SignUp"  isPrimaryBtn={isLogin ? true : false} handleClick={()=>setIsLoggin(false)}/>
            </div>}
            {(token || isGoogleLoggedIn) && <div className={styles.btnWrapper}>
                <Button text="Logout"  handleClick={()=>handleLogout()} customStyle={styles.logoutBtn}/>
            </div>}
        </header>
    )
}