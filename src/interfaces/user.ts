export interface UserInterface {
    id: number,
    name: string;
    role: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}