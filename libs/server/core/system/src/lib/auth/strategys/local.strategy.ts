import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  /**
   * 验证用户
   * @param payload
   */
  async validate(username: string, password: string): Promise<JwtPayload> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new BadRequestException('用户名或密码错误');
    }
    return user;
  }
}
