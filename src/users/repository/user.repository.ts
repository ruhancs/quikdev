import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly dbContext: PrismaService) {}

  async createUser(signUpDto: SignupDto): Promise<UserEntity> {
    return this.dbContext.user.create({
      data: signUpDto,
    });
  }

  async findAllUser(): Promise<UserEntity[]> {
    return this.dbContext.user.findMany();
  }

  async findUserById(id: number): Promise<UserEntity> {
    console.log(id);
    return this.dbContext.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return this.dbContext.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
