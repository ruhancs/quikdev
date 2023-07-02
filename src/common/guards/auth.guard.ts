import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuardUser implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const tokenPayload = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );
      if (!tokenPayload) {
        throw new BadRequestException('Invalid Token');
      }
      const user = await this.userService.findOne(+tokenPayload);
      const userInRequest = {
        id: user.id,
        email: user.email,
      };
      request.user = userInRequest;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
