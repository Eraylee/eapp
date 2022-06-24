import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  /**
   * 验证用户
   * @param username
   * @param pass
   */
  async validateUser(params: LoginDto): Promise<JwtPayload> {
    const user = await this.userService.validate(
      params.username,
      params.password
    );
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      roles: user.roles.map((v) => v.code),
      nickname: user.nickname,
      userNo: user.userNo,
    };
  }

  /**
   * 登录
   * @param user
   */
  async login(params: JwtPayload): Promise<string> {
    return this.jwtService.sign(params);
  }
}
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZG1pbiIsInJvbGVDb2RlIjoiZCIsIm5pY2tuYW1lIjoic3RyaW5nIiwiaWF0IjoxNTk0MTc2Nzg3LCJleHAiOjE1OTQxNzY3ODh9.yLeNH8utyR44QQ873FpZ3WjYo3kez6o5bMyCGT0dCV0
