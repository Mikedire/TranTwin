"use client"

import {AuthSession, destroySession, getSession} from "../auth/session_utils";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Page(){

    const router = useRouter()

    let session : AuthSession|null = null
    const [givenName, setGivenName] = useState("")
    const [familyName, setFamilyName] = useState("")

    useEffect(() => {
        session =  getSession()

        if (session == null){
            router.push("/")
        }

        console.log("session", session)
        setGivenName(session?.given_name)
        setFamilyName(session?.family_name)
    }, []);

    return (<div className={"flex flex-col"}>
        <p>Account Page</p>
        <p>Name: {givenName} {familyName}</p>

        <button onClick={
            ()=> {
                destroySession()
                router.push("/")
            }
        }>Logout</button>
    </div>)
}