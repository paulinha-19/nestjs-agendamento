import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, cpf } = createUserDto;

    const cpfExists = await this.userModel.findOne({ cpf }).exec();
    const emailExists = await this.userModel.findOne({ email }).exec();
    const userNameExists = await this.userModel.findOne({ username }).exec();

    if (cpfExists || emailExists || userNameExists) {
      throw new BadRequestException(
        `O username: ${username} e/ou email: ${email} e/ou cpf: ${cpf} já existe no banco de dados.`
      );
    }

    const hashedPassword = encodePassword(createUserDto.password);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return await newUser.save();
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
