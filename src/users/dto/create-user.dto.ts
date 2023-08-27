export class CreateUserDto {
    name: string;
    username: string;
    email: string;
    password: string;
    cpf:string;
    sex: string;
    birth?: Date
}
