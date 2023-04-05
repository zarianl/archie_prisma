// components/Sidebar.tsx
"use client"
import { useState, useEffect } from 'react';
import { Assistant } from '@/lib/types';
import { createAssistant, getAssistants } from '@/lib/db';

const Sidebar = () => {
    const [assistantName, setAssistantName] = useState('');
    const [assistants, setAssistants] = useState<Assistant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAssistants = async () => {
        try {
            setLoading(true);
            const data = await getAssistants();
            setAssistants(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateAssistant = async () => {
        if (!assistantName.trim()) return;
        await createAssistant({ name: assistantName, firstMessageText: 'Hello, I am your new assistant!' });
        setAssistantName('');
        fetchAssistants();
    };

    useEffect(() => {
        fetchAssistants();
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div className="bg-white w-64 h-full p-4 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Assistants</h2>
            {assistants.length === 0 && <p>No assistants found. Create a new assistant below.</p>}
            <ul className="flex-grow overflow-y-auto">
                {assistants.map((assistant) => (
                    <li key={assistant.id} className="mb-2">
                        {assistant.name}
                    </li>
                ))}
            </ul>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    value={assistantName}
                    onChange={(e) => setAssistantName(e.target.value)}
                    className="flex-grow bg-gray-200 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="New assistant..."
                />
                <button onClick={handleCreateAssistant} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Add
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
