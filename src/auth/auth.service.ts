import { BadRequestException, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JwtPayload } from './models/jwt.payload';
import { UserEntity } from 'src/users/entities/user.entity';
import { Request } from 'express';
import { UserRepository } from 'src/users/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async createAccessToken(userId: string) {
    return {
      accessToken: sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
      }),
    };
  }

  public async validaeUser(jwtPayload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findUserById(+jwtPayload.userId);

    return user;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('No auth');
    }

    return authHeader;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }

  public checkToken(token: string): any {
    try {
      const data = verify(token, process.env.JWT_SECRET);
      return data.sub;
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
