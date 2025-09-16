'use client'

import {useRouter, useSearchParams} from 'next/navigation'
import {Suspense, useEffect} from 'react'
import {jwtDecode} from "jwt-decode";
import {AuthSession, storeSession} from "./session_utils";

function Content() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const loginUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_DTO4T_Login/oauth2/v2.0/token" //tenant dgqatalyst
    const client_id = "a2fc7ccd-fd7e-450f-96ef-1d4c2b71e98e"
    const client_secret = "9Gp8Q~nO5I2QcK~fCLAqQuQd1lWRcUUzF1~1HbfX"
    const redirect_url = "http://localhost:3000/auth"
    const scope = "openid profile"
    const registerUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_DTO4T_Register/oauth2/v2.0/token"
    const passwordResetUrl = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/B2C_1_DTO4T_PasswordReset/oauth2/v2.0/token"

    const requestBody = {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_url,
        code: code,
        scope: scope,
        grant_type: "authorization_code",
    }

    const urlSearchParams = new URLSearchParams(requestBody as Record<string, string>)

    useEffect(() => {
        if (!error) return;
        // Handle error
        if (error === "access_denied") {
            window.location.href = "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_DTO4T_PasswordReset&client_id=a2fc7ccd-fd7e-450f-96ef-1d4c2b71e98e&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&scope=openid&response_type=code&prompt=login";
            console.error("Access denied by user");
        } else if (error === "invalid_request") {
            console.error("Invalid request, possibly due to missing parameters");
        } else {
            console.error("An unknown error occurred:", error);
        }
    }, [error]);

    useEffect(() => {
        if (!code) return;

        // Try login first
        fetch(loginUrl, {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: urlSearchParams,
        })
            .then(res => res.json())
            .then(json => {
                if (json.error === "invalid_grant") {
                    // If login fails with invalid_grant, try register
                    return fetch(registerUrl, {
                        method: "POST",
                        headers: {"Content-Type": "application/x-www-form-urlencoded"},
                        body: urlSearchParams,
                    })
                        .then(res => res.json())
                        .then(json => {
                            if (json.error === "invalid_grant") {
                                // If register also fails with invalid_grant, try password reset
                                return fetch(passwordResetUrl, {
                                    method: "POST",
                                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                                    body: urlSearchParams,
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        console.log("Password reset response:", json)
                                        return json;
                                    });
                            } else {
                                console.log("Register response:", json)
                                return json;
                            }
                        });
                } else {
                    console.log("Login response:", json)
                    ///decode the json
                    const id_token = json.id_token
                    console.log("id token", id_token)
                    const decoded: AuthSession = jwtDecode(id_token)
                    console.log("decoded", decoded)
                    storeSession(decoded)
                    setTimeout(()=>{
                        router.push("/profile-demo")
                    }, 3000)
                    return json;
                }
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