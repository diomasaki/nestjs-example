export interface IUserLogin {
    readonly username: string;
    readonly password: string;
}

export interface IUser extends IUserLogin {
    readonly email: string;
    readonly phone: number;
}