import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { DataDictionaryModule } from './data-dictionary/data-dictionary.module';

@Module({
  imports: [UserModule, RoleModule, MenuModule, DataDictionaryModule],
})
export class SystemModule {}
