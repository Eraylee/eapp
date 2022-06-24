export const environment = {
  production: false,
  PORT: 8000,
  // #orm加载地址
  ORM_LOADING_PATH: 'src',

  LOG_FILE_PATH: 'logs',
  // #默认用户密码
  DEFAULT_PASSWORD: '123456',

  CASBIN_CONF_PATH: 'casbin_conf/model.conf',

  // #数据库类型
  TYPEORM_TYPE: 'mysql',
  // #数据库host
  TYPEORM_HOST: 'localhost',

  // #数据库端口
  TYPEORM_PORT: '3306',

  // #数据库用户名
  TYPEORM_USERNAME: 'root',
  // #数据库密码
  TYPEORM_PASSWORD: '12345678',
  // #数据库名
  TYPEORM_DATABASE: 'laboratory-consumable',

  TYPEORM_SYNCHRONIZE: true,
  TYPEORM_LOGGING: true,
  TYPEORM_MIGRATIONS_RUN: true,
  TYPEORM_ENTITIY: 'dist/app/**/*.entity{.ts,.js}',

  // #token加密密钥
  JWT_SECRET: 'JWT_SECRET',

  // #token时效
  JWT_EXPIRESIN: '1800s',
};
