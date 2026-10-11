"use client"

import {useRouter} from 'next/navigation'
import {ChatBox, ChatMessage} from "../components";
import React, {useEffect, useState} from "react";

// Type definition for MessageModel
interface MessageModel {
    role: "user" | "assistant";
    content: string;
}

export default function Page({
                                 params,
                             }: {
    params: Promise<{ session: string }>
}) {
    const router = useRouter()
    const [session, setSession] = useState("");
    const [sessionMessages, setSessionMessages] = useState<MessageModel[]>([]);

    useEffect(() => {
        params.then(param => {
            setSession(param.session)
        })
    }, []);

    //fetch messages for said session (proxied server-side via /api/clinic/session)
    useEffect(() => {
        if (session != "") {
            fetch("/api/clinic/session?id=" + session, {
                method: "GET",
                redirect: "follow"
            })
                .then((response) => response.json())
                .then((result) => {
                    setSessionMessages(result.data)
                    console.log("session messages" + result.body);
                })
                .catch((error) => console.error(error));
        }
    }, [session]);

    function onSendMessage(text: String) {
        let message = {role: "user", content: text};
        //@ts-ignore
        setSessionMessages(sessionMessages => [...sessionMessages, message])
        fetch("/api/clinic/session?id=" + session + "&query=" + encodeURIComponent(text.toString()), {
            method: "GET",
            redirect: "follow"
        })
            .then((response) => response.json())
            .then((result) => {
                let message = {role: "assistant", content: result.message};
                //@ts-ignore
                setSessionMessages(sessionMessages => [...sessionMessages, message])
                console.log(result)
            })
            .catch((error) => console.error(error));
    }

    // Component styles
    const mainContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
    };

    const messagesListStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '13rem',
        marginRight: '13rem',
        marginTop: '2.5rem'
    };

    const messageItemStyle: React.CSSProperties = {
        display: 'flex',
        width: '100%'
    };

    const chatBoxContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '13rem',
        marginRight: '13rem',
        marginTop: '1.25rem'
    };

    return (
        <div style={mainContainerStyle}>
            <ul style={messagesListStyle}>
                {sessionMessages && sessionMessages.map((item, index) => (
                    <li key={index} style={messageItemStyle}>
                        <ChatMessage model={item}/>
                    </li>
                ))}
            </ul>

            <div style={chatBoxContainerStyle}>
                <ChatBox onSend={onSendMessage}/>
            </div>
        </div>
    )
}