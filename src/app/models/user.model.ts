export class User {
    public id : string;
    public name: string;
    public login: string;
    public password : string;
    public expiresAt: number;
    public token: string;

    constructor(login?: string, password?: string,
        id?:string, token?: string, expiresAt?: number){
        this.id = id;
        this.login = login;
        this.password = password;
        this.expiresAt = expiresAt;
        this.token = token;
    }
}