import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import * as path from 'path';
import { routes } from './app.routes';
import { SystemModule, AuthModule } from '@eapp/server/core/system';
import { CasbinModule } from '@eapp/server/core/casbin';
import { AppConfig, AuthConfig, DateBaseConfig } from '../configs';
import { GallerymModule } from './gallery';
// const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      // validate: EnvValidate,
      load: [AppConfig, AuthConfig, DateBaseConfig],
      expandVariables: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    RouterModule.forRoutes(routes),
    SystemModule,
    AuthModule,
    CasbinModule,
    GallerymModule,
  ],
})
export class AppModule {}
