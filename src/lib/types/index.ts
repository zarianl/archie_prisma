export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Assistant = {
    id: number;
    name: string;
    firstMessageText: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
};
