"use client"

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { display } from "styled-system";

// Color constants
const COLORS = {
  lightGray: '#f9fafb',
  clinicBorder: '#e5e7eb',
  clinicText: '#374151',
  newChatText: '#9ca3af',
  white: '#ffffff',
  black: '#000000',
  primaryBlue: '#0070F3'
};

// Import auth utils - make sure this path is correct
const loginUrl = "/login"; // Adjust this path as needed

// Inline component definitions to avoid import issues
function SessionHeader() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const t = sessionStorage.getItem("token");
        if (t != null && t != "") {
            setLoggedIn(true)
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

    const loginButtonStyle: React.CSSProperties = {
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

    const loginTextStyle: React.CSSProperties = {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: COLORS.white
    };

    return (
        <div style={headerStyle}>
            <div style={logoContainerStyle}>
                <Image src={"/icons/clinic_logo.svg"} width={20} height={20} alt={"clinic logo"}/>
                <p style={logoTextStyle}>DBP Clinic</p>
            </div>

            {loggedIn && (
                <div style={userAvatarStyle}>
                    <p style={avatarTextStyle}>S</p>
                </div>
            )}

            {!loggedIn && (
                <div style={loginButtonStyle} onClick={() => window.location.href = loginUrl}>
                    <p style={loginTextStyle}>Login</p>
                </div>
            )}
        </div>
    )
}

function LoginPromptText() {
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1.5rem'
    };

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

export default function Layout({children}: { children: React.ReactNode }) {
    const sessionModel: SessionModel = {
        sessionId: "dfsfsdgfsgdkshfd-fdhfskdjfgsdkhfs-fsdfksjdh",
        sessionName: "Digital Maturity Assessment."
    }

    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [showMenu, setShowMenu] = useState(true);

    // Check if the user is logged in
    useEffect(() => {
        const t = sessionStorage.getItem("token");
        if (t != null && t != "") {
            setLoggedIn(true)
            setToken(t)
            console.log(" logged in", token)
        } else {
            setLoggedIn(false);
            console.log("not logged in")
        }
    }, [])

    function onMenuClick() {
        setShowMenu(!showMenu);
    }

    // Main layout styles
    const mainLayoutStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100vh'
    };

    const sidebarStyle: React.CSSProperties = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: COLORS.lightGray,
        padding: '1.5rem',
        minWidth: '280px'
    };

    const sidebarHeaderStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const logoStyle: React.CSSProperties = {
        cursor: 'pointer'
    };

    const spacerStyle: React.CSSProperties = {
        width: '10rem'
    };

    const menuButtonStyle: React.CSSProperties = {
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '0.375rem',
        border: `1px solid ${COLORS.clinicBorder}`,
        backgroundColor: COLORS.white
    };

    const spacerVerticalStyle: React.CSSProperties = {
        height: '1rem',
        width: '5rem'
    };

    const newChatHeaderStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const newChatTextStyle: React.CSSProperties = {
        fontSize: '0.875rem',
        color: COLORS.newChatText
    };

    const plusButtonStyle: React.CSSProperties = {
        padding: '0.5rem',
        border: '1px solid',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        backgroundColor: COLORS.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const todayTextStyle: React.CSSProperties = {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: COLORS.black
    };

    const contentAreaStyle: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        justifyContent: 'space-between'
    };

    const floatingMenuButtonStyle: React.CSSProperties = {
        position: 'absolute',
        top: '5rem',
        left: '1rem',
        padding: '0.5rem',
        cursor: 'pointer',
        borderRadius: '0.375rem',
        border: `1px solid ${COLORS.clinicBorder}`,
        backgroundColor: COLORS.white,
        width: 'fit-content',
        height: 'fit-content',
        zIndex: 10
    };

    const childrenContainerStyle: React.CSSProperties = {
        display: 'flex',
        paddingBottom: '2rem',
        overflowY: 'auto',
        flex: 1
    };

    console.log("Layout rendering - showMenu:", showMenu); // Debug log

    return (
        <div style={mainLayoutStyle}>
            {/* Sidebar */}
            {showMenu && (
                <div style={sidebarStyle}>
                    <div style={sidebarHeaderStyle}>
                        <Image 
                            src={"/icons/trantwin_logo.svg"} 
                            width={94} 
                            height={24} 
                            alt={"logo"}
                            style={logoStyle}
                        />

                        <p style={spacerStyle}></p>

                        <div style={menuButtonStyle} onClick={onMenuClick}>
                            <Image src={"/icons/menu.svg"} width={21} height={21} alt={"icon"}/>
                        </div>
                    </div>

                    <div style={spacerVerticalStyle}></div>

                    <div style={newChatHeaderStyle}>
                        <p style={newChatTextStyle}>New Chat</p>

                        <div style={plusButtonStyle}>
                            <Image src={"/icons/plus.svg"} height={16} width={16} alt={"icon"}/>
                        </div>
                    </div>

                    {!loggedIn && <LoginPromptText/>}

                    {!loggedIn && (
                        <div>
                            <div style={{}}></div>
                            <p style={todayTextStyle}>Today</p>
                            <SessionItem sessionModel={sessionModel}/>
                        </div>
                    )}
                </div>
            )}

            {/* Main Content Area */}
            <div style={contentAreaStyle}>
                <SessionHeader/>
                
                {!showMenu && (
                    <div style={floatingMenuButtonStyle} onClick={onMenuClick}>
                        <Image src={"/icons/menu.svg"} width={24} height={24} alt={"icon"}/>
                    </div>
                )}
                
                <div style={childrenContainerStyle}>
                    {children}
                </div>
            </div>
        </div>
    )
}

function SessionItem({sessionModel}: { sessionModel: SessionModel }) {
    const router = useRouter();

    function onClick() {
        router.push("/clinic/" + sessionModel.sessionId);
    }

    const sessionItemStyle: React.CSSProperties = {
        cursor: 'pointer'
    };

    const sessionTextStyle: React.CSSProperties = {
        cursor: 'pointer',
        color: COLORS.newChatText,
        fontSize: '1rem',
        fontWeight: '300'
    };

    return (
        <div style={sessionItemStyle} onClick={onClick}>
            <p style={sessionTextStyle}>{sessionModel.sessionName}</p>
        </div>
    )
}

interface SessionModel {
    sessionId: String,
    sessionName: String
}