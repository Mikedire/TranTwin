"use client"

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { buildAuthorizeUrl } from "@lib/config";

// Color constants - adjust these to match your design system
const COLORS = {
  clinicBorder: '#e5e7eb',
  clinicText: '#374151',
  clinicGray: '#6b7280',
  primaryBlue: '#0070F3',
  lightGray: '#f9fafb',
  newChatText: '#9ca3af',
  white: '#ffffff',
  black: '#000000'
};

export function SessionHeader() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    //check if the use is logged in
    useEffect(() => {
        const t = sessionStorage.getItem("token");
        if (token != null && token != "") {
            setLoggedIn(true)
            //@ts-ignore
            setToken(t)
            console.log(" logged in", token)
        } else {
            setLoggedIn(false);
            console.log("not logged in")
        }
    }, [])

    const headerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '1rem',
        borderBottom: `1px solid ${COLORS.clinicBorder}`
    };

    const logoContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    };

    const logoTextStyle: React.CSSProperties = {
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        fontSize: '1rem',
        color: COLORS.clinicText,
        fontWeight: '300'
    };

    const userAvatarStyle: React.CSSProperties = {
        height: '2.25rem',
        width: '2.25rem',
        borderRadius: '50%',
        backgroundColor: COLORS.primaryBlue,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const avatarTextStyle: React.CSSProperties = {
        fontWeight: '400',
        color: COLORS.white,
        fontSize: '1rem'
    };

    return (
        <div style={headerStyle}>
            <div style={logoContainerStyle}>
                <Image src={"/icons/clinic_logo.svg"} width={20} height={20} alt={"clinic logo"}/>
                <p style={logoTextStyle}>DBP Clinic</p>
            </div>

            {loggedIn &&
                <div style={userAvatarStyle}>
                    <p style={avatarTextStyle}>S</p>
                </div>}

            {!loggedIn && <LoginButton/>}
        </div>
    )
}

export function SpaceSmall() {
    const spaceStyle: React.CSSProperties = {
        padding: '1rem'
    };

    return <div style={spaceStyle}></div>
}

export function SpaceMedium() {
    const spaceStyle: React.CSSProperties = {
        padding: '2rem'
    };

    return <div style={spaceStyle}></div>
}

export function SpaceLarge() {
    const spaceStyle: React.CSSProperties = {
        padding: '4rem'
    };

    return <div style={spaceStyle}></div>
}

export function PromptGroup({clickItem}: { clickItem: (text: string) => void }) {
    const defaults = [
        "I'm planning a project and need help figuring out how to implement it.",
        "I already have a project but need guidance on how to continue effectively.",
        "I have a project that works well but want to improve it further with AI.",
        "I'd like to assess my organisation's digital maturity level."
    ];

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        marginLeft: '13rem',
        marginRight: '13rem'
    };

    return (
        <ul style={gridStyle}>
            {defaults.map((item, index) => (
                <li key={index}>
                    <PromptItem content={item} onclick={() => clickItem(item)}/>
                </li>
            ))}
        </ul>
    )
}

export function PromptItem({content, onclick}: { content: string, onclick: (content: string) => void }) {
    const itemStyle: React.CSSProperties = {
        paddingLeft: '2rem',
        paddingRight: '2rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        border: `1px solid ${COLORS.clinicBorder}`,
        borderRadius: '0.75rem',
        cursor: 'pointer'
    };

    const textStyle: React.CSSProperties = {
        fontWeight: '300',
        fontSize: '0.75rem',
        width: '75%',
        color: COLORS.clinicGray
    };

    return (
        <div style={itemStyle} onClick={() => onclick(content)}>
            <p style={textStyle}>"{content}"</p>
        </div>
    )
}

export function ChatBox({onSend}: { onSend: (text: string) => void }) {
    const textareaRef = useRef(null)
    const [chatText, setChatText] = useState("")

    const handleInput = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            //@ts-ignore
            textarea.style.height = textarea.scrollHeight + 'px'
        }
    };

    function onTextChange(e: any) {
        setChatText(e.target.value)
        console.log("chat", chatText)
    }

    function onSendClick() {
        onSend(chatText)
        setChatText("")
    }

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: `1px solid ${COLORS.clinicBorder}`,
        borderRadius: '1.5rem',
        justifyContent: 'space-between',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        alignItems: 'center',
        height: 'auto',
        marginBottom: '2.5rem'
    };

    const textareaStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        outline: 'none',
        width: '100%',
        resize: 'none',
        whiteSpace: 'pre-wrap',
        maxHeight: '13rem',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        overflow: 'hidden',
        border: 'none'
    };

    const controlsStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        margin: '1rem'
    };

    const iconStyle: React.CSSProperties = {
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <textarea
                onKeyDown={handleInput}
                ref={textareaRef}
                onInput={handleInput}
                onChange={onTextChange}
                placeholder="Ask DBP Clinic..."
                rows={1}
                value={chatText}
                style={textareaStyle}
            />
            <div style={controlsStyle}>
                <div style={iconStyle}>
                    <Image src={"/icons/clip.svg"} alt={"icon"} width={24} height={24}/>
                </div>
                <div style={iconStyle} onClick={onSendClick}>
                    <Image src={"/icons/push.svg"} alt={"icon"} width={24} height={24}/>
                </div>
            </div>
        </div>
    )
}

export function LoginPromptText() {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1.5rem'
    };

    const loginUrl = buildAuthorizeUrl("login")

    const textStyle: React.CSSProperties = {
        fontSize: '0.875rem'
    };

    const linkStyle: React.CSSProperties = {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: COLORS.primaryBlue
    };

    return (
        <div style={containerStyle}>
            <p style={textStyle}>
                <span 
                    style={linkStyle}
                    onClick={() => window.location.href = loginUrl}
                >
                    Login
                </span> to save and revisit previous chats!
            </p>
        </div>
    )
}

export function LoginButton() {
    const buttonStyle: React.CSSProperties = {
        backgroundColor: COLORS.primaryBlue,
        borderRadius: '0.375rem',
        width: '6rem',
        height: '2.25rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    };

    const loginUrl = buildAuthorizeUrl("login")

    const textStyle: React.CSSProperties = {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: COLORS.white
    };

    return (
        <div style={buttonStyle} onClick={() => window.location.href = loginUrl}>
            <p style={textStyle}>Login</p>
        </div>
    )
}

export function UserMessage({content}: { content: string }) {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        borderRadius: '0.375rem',
        justifyContent: 'flex-end',
        marginTop: '2rem',
        width: '100%'
    };

    const messageStyle: React.CSSProperties = {
        padding: '1rem',
        backgroundColor: COLORS.primaryBlue,
        borderRadius: '0.75rem'
    };

    const textStyle: React.CSSProperties = {
        fontSize: '1rem',
        fontWeight: '500',
        color: COLORS.white,
        maxWidth: '24rem'
    };

    return (
        <div style={containerStyle}>
            <div style={messageStyle}>
                <p style={textStyle}>{content}</p>
            </div>
        </div>
    )
}

export function AssistantMessage({content}: { content: string }) {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: '2rem'
    };

    const iconStyle: React.CSSProperties = {
        display: 'flex',
        height: '1rem',
        width: '1rem',
        marginLeft: '1rem',
        marginRight: '1rem'
    };

    const contentStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column'
    };

    return (
        <div style={containerStyle}>
            <Image 
                src={"/icons/clinic_logo.svg"} 
                height={16} 
                width={16} 
                alt={"icon"} 
                style={iconStyle}
            />
            <div style={contentStyle}>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {content}
                </Markdown>
            </div>
        </div>
    )
}

export function ChatLoading() {
    return <div></div>
}

export function ChatMessage({model}: { model: MessageModel }) {
    if (model.role == "user") {
        return <UserMessage content={model.content}/>
    } else if (model.role == "assistant") {
        return <AssistantMessage content={model.content}/>
    }
}

// Type definition for MessageModel
interface MessageModel {
    role: "user" | "assistant";
    content: string;
}