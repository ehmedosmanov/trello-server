import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    console.log('User', req.user)
    return req.user;
  },
);
