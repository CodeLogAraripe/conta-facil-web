export interface SignInCredentials {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    user: IUser;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: address;
    cpfCnpj?: string;
    createdAt: string;
    updatedAt: string;
}

export interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
    phone: string;
    address?: address;
    cpfCnpj?: string;
}

export interface address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    referencePoint: string;
}