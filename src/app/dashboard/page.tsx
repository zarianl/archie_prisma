"use client";
import React, { useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

interface Message {
    content: string;
    isUser: boolean;
}

const Dashboard: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSendMessage = (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return (
        <div className="flex-grow bg-gray-300 p-4 overflow-y-auto">
            <div className="overflow-y-auto p-4 flex-grow">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={index}
                        content={message.content}
                        isUser={message.isUser}
                    />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Dashboard;
