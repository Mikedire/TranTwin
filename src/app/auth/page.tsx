'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {Suspense, useEffect} from 'react'
import {jwtDecode} from "jwt-decode";
import {AuthSession, storeSession} from "./session_utils";
import { buildAuthorizeUrl } from "@lib/config";

function Content() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    useEffect(() => {
        if (!error) return;
        // Handle error
        if (error === "access_denied") {
            window.location.href = buildAuthorizeUrl("passwordReset");
            console.error("Access denied by user");
        } else if (error === "invalid_request") {
            console.error("Invalid request, possibly due to missing parameters");
        } else {
            console.error("An unknown error occurred:", error);
        }
    }, [error]);

    useEffect(() => {
        if (!code) return;

        // The token exchange (incl. client_secret) happens server-side in
        // /api/auth/token — the secret is never shipped to the browser.
        fetch("/api/auth/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ code }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.success?.id_token) {
                    const id_token = json.success.id_token
                    const decoded: AuthSession = jwtDecode(id_token)
                    storeSession(decoded)
                    setTimeout(()=>{
                        router.push("/profile-demo")
                    }, 3000)
                    return json.success;
                }
                console.log("Auth exchange attempts:", json.attempts)
                return null;
            })
            .catch(error => {
                console.error("Network or other error:", error)
            });
    }, [code]);

    return (
        <div className="flex flex-col w-screen h-screen justify-center items-center">

            <div className="flex flex-col items-center space-y-4">
                <p className="text-xl">Authenticating</p>
            </div>

        </div>
    )
}

export default function Page() {
    return (
        <Suspense>
            <Content/>
        </Suspense>
    )
}