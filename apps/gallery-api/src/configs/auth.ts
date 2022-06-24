import { registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRESIN: process.env.JWT_EXPIRESIN,
}));
