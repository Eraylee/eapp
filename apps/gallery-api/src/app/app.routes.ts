import { Routes } from 'nest-router';
import {
  SystemModule,
  UserModule,
  AuthModule,
  RoleModule,
  MenuModule,
  DataDictionaryModule,
} from '@eapp/server/core/system';
import {
  GallerymModule,
  AlbumModule,
  CategoryModule,
  PhotoModule,
} from './gallery';

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
  {
    path: '/gallery',
    module: GallerymModule,
    children: [
      { path: '/album', module: AlbumModule },
      { path: '/category', module: CategoryModule },
      { path: '/photo', module: PhotoModule },
    ],
  },
];
