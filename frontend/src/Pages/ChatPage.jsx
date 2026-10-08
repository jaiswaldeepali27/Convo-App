import axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';

    const ChatPage = () => {
        const [chats, setchats] = useState([])
        const fetchChats = async () => {
            const {data} = await axios.get('/api/chat');
            setchats(data);  
        };

        useEffect(() => {
            fetchChats();
        }, [])
    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id}>{chat.chatName}</div>
            ))}
        </div>
    )
    }

    export default ChatPage