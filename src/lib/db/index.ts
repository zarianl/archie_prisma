// lib/db.ts
import { PrismaClient, AssistantCreateInput } from '@prisma/client';
import {Assistant} from "@/lib/types";

const prisma = new PrismaClient();

export async function getAssistants(): Promise<Assistant[]> {
    return await prisma.assistant.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    });
}

export async function createAssistant(data: AssistantCreateInput): Promise<Assistant> {
    return await prisma.assistant.create({ data });
}
