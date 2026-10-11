"use client"
import {ChatBox, PromptGroup, SpaceLarge, SpaceMedium, SpaceSmall} from "./components";
import Image from "next/image"
import React from "react";
import {useRouter} from "next/navigation";

// Color constants
const COLORS = {
  clinicGray: '#6b7280'
};

export default function Page() {
    const router = useRouter()

    function onSendMessage(text: string) {
        if (text == "") {
            return
        }

        const raw = JSON.stringify({
            "lifeCycleStage": "",
            "sector": "",
            "industry": "",
            "painPoints": text
        });

        // Proxied server-side (bearer token kept out of the browser).
        fetch("/api/clinic/session", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: raw,
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                const path = "/clinic/" + result.sessionId;
                router.push(path);
                console.log(path)
            })
            .catch((error) => console.error(error));
    }

    // Main container styles
    const mainContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between'
    };

    const contentContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%'
    };

    const centerContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const logoRowStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    };

    const logoImageStyle: React.CSSProperties = {
        margin: '0.5rem'
    };

    const welcomeTextStyle: React.CSSProperties = {
        fontWeight: 'bold',
        color: COLORS.clinicGray
    };

    const descriptionTextStyle: React.CSSProperties = {
        color: COLORS.clinicGray,
        width: '33.333333%',
        textAlign: 'center',
        fontSize: '0.875rem'
    };

    const promptContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '13rem',
        marginRight: '13rem',
        marginTop: '1.25rem'
    };

    return (
        <div style={mainContainerStyle}>
            <SpaceLarge/>

            <div style={contentContainerStyle}>
                <div style={centerContainerStyle}>
                    <div style={logoRowStyle}>
                        <Image 
                            src={"/icons/clinic_logo.svg"} 
                            height={"26"} 
                            width={"26"} 
                            alt={"icon"}
                            style={logoImageStyle}
                        />
                        <Image src={"/icons/plus.svg"} height={"26"} width={"10"} alt={"icon"}/>
                        <Image 
                            src={"/icons/chat.svg"} 
                            height={"32"} 
                            width={"32"} 
                            alt={"icon"} 
                            style={logoImageStyle}
                        />
                    </div>

                    <SpaceSmall/>

                    <p style={welcomeTextStyle}>Welcome to DBP Clinic</p>

                    <SpaceSmall/>

                    <p style={descriptionTextStyle}>
                        Gain deep insights into your digital capabilities and receive
                        tailored recommendations to accelerate growth.
                    </p>
                </div>
            </div>

            <SpaceMedium/>
            
            <PromptGroup clickItem={(t) => {
                onSendMessage(t)
            }}/>

            <div style={promptContainerStyle}>
                <ChatBox onSend={onSendMessage}/>
            </div>
        </div>
    )
}