// components/ChatInput.tsx
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import axios from 'axios';

interface ChatInputProps {
    onSendMessage: (message: { content: string; isUser: boolean }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        if (!message.trim()) return;
        onSendMessage({ content: message, isUser: true });
        setMessage('');

        try {
            const response = await axios.post('/api/chat', { message });
            console.log('response', response)
            const botMessage = response.data.content.trim();
            onSendMessage({ content: botMessage, isUser: false });
        } catch (error) {
            console.error('Error fetching response from OpenAI API:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="flex items-center p-4 space-x-4">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                className="flex-grow bg-white rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />
            <button
                onClick={sendMessage}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
