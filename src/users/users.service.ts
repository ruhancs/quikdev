import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}
  private async createJwtToken(userId: string) {
    return this.authService.createAccessToken(userId);
  }

  async signup(signUpDto: SignupDto) {
    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
    const user = await this.userRepository.createUser(signUpDto);
    const jwtToken = await this.createJwtToken(user.id.toString());
    return jwtToken;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Incorrect email or password');
    }

    return user;
  }

  async signin(signinDto: SigninDto) {
    const user = await this.findUserByEmail(signinDto.email);
    const checkPassword = await this.checkPassword(signinDto.password, user);
    if (!checkPassword) {
      throw new NotFoundException('Incorrect email or password');
    }
    const jwtToken = await this.createJwtToken(user.id.toString());
    return jwtToken;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAllUser();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, requestUser: any) {
    const user = await this.findOne(id);
    if (requestUser.id !== user.id) {
      throw new UnauthorizedException();
    }
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    return this.userRepository.updateUser(id, updateUserDto);
  }

  private async checkPassword(
    password: string,
    user: UserEntity,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    return match;
  }
}
