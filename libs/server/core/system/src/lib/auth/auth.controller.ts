import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '@eapp/server/core/guards';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户登录
   * @param params
   */
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req: Request): Promise<string> {
    return this.authService.login(req['user']);
  }
}
