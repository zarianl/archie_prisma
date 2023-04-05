// pages/api/assistants.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next"
import authOptions from "./auth/[...nextauth]"


const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        const assistants = await prisma.assistant.findMany({
            where: { userId: session.user.id },
        });
        res.status(200).json(assistants);
    } else if (req.method === 'POST') {
        const { name, firstMessageText } = req.body;
        const newAssistant = await prisma.assistant.create({
            data: {
                name,
                firstMessageText,
                userId: session.user.id,
            },
        });
        res.status(201).json(newAssistant);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;
