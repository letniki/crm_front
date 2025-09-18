export interface IManager {
    id: number;
    email: string;
    name: string;
    surname: string;
    isActive: boolean;
    lastLogIn: string | null;
    total: number;
}