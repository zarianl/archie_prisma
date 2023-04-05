const ChatMessage = ({ content, isUser }) => {
    return (
        <div
            className={`max-w-md mb-2 px-4 py-2 rounded ${
                isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200'
            }`}
        >
            {content}
        </div>
    );
};

export default ChatMessage;
