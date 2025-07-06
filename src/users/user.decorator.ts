import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/sessions/sessions.guard';

type AuthenticatedRequests = Request & { user?: JwtPayload };

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequests>();

    return request.user;
  },
);
