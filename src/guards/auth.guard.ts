import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

function validateRequest(request: Request) {
  const authorizationHeader = request.headers['authorization'];
  if (!authorizationHeader) {
    throw new UnauthorizedException('Authorization header is missing');
  }
  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Basic') {
    throw new UnauthorizedException('Invalid authorization header format');
  }
  const credentials = parts[1].split(':');
  if (credentials.length !== 2 || !credentials[0] || !credentials[1]) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return true;
}

@Injectable()
export class Authorization implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
