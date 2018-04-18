export interface User {
    uid: string;
    email: string;
    pseudo: string;
    roles: Roles;
}

export interface Roles {
    admin?: boolean;
    simpleUser?: boolean;
}
