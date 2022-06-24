import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { MenuEntity } from '../menu';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, MenuEntity])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
