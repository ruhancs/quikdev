import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (request.user) {
    return request.user;
  } else {
    throw new NotFoundException(
      'User not found on request, decorator User must be used together with authguarduser',
    );
  }
});
