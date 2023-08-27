import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = new this.userModel({...createUserDto, password});
    return newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findUserByUsername(username: string){
    return this.userModel.findOne({ username })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate({
      _id: id
    },
    {
      updateUserDto,
    },
    {
      new: true,
    },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({
      _id: id,
    })
    .exec();
  }
}
