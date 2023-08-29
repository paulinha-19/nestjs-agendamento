import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject('') private readonly userService: UsersService,
    ) {}

    async validateUser(username: string, password: string){
        console.log('Inside validateUser');
        const userDB = await this.userService.findOne(username)
        if(userDB){
            const matched = comparePasswords(password, userDB.password)
            if(matched){
                console.log("User Validation Sucess");
                return userDB
            } else {
                console.log("Passwords do not match");
                return null;
            }
        }
        console.log("User Validation Failed");
        return null;
    }

}
