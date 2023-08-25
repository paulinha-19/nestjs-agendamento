import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('') private readonly userService: UsersService,
    ) {}

    async validateUser(username: string, password: string){
        console.log('Inside validateUser');
        const userDB = await this.userService.findOne
    }

}
