'use client'
import LoginPage from "@/components/pages/login/login";
import {  useSession } from "next-auth/react";
import { useEffect } from "react";
import {  useRouter } from "next/navigation";
import { cookie } from "@/apis/cookies";

export default function Home() {
  const { data: session, status } = useSession();
  const token = cookie.userToken
  const router = useRouter()

  useEffect(()=>{
    if (status === 'authenticated' || token) {
      router.push("/task");
      return
    }
  },[])

  return (
      <LoginPage/>
  )
}
