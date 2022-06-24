import { Routes } from 'nest-router';
import {
  SystemModule,
  UserModule,
  AuthModule,
  RoleModule,
  MenuModule,
  DataDictionaryModule,
} from '@eapp/server/core/system';

export const routes: Routes = [
  {
    path: '/system',
    module: SystemModule,
    children: [
      { path: '/user', module: UserModule },
      { path: '/role', module: RoleModule },
      { path: '/menu', module: MenuModule },
      { path: '/dataDictionary', module: DataDictionaryModule },
    ],
  },
  {
    path: '/auth',
    module: AuthModule,
  },
];
