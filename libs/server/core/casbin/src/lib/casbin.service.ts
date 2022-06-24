import { Enforcer, newEnforcer } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CasbinService {
  public enforcer: Enforcer;

  constructor(private readonly config: ConfigService) {
    this.init();
  }

  private async init(): Promise<void> {
    const a = await TypeORMAdapter.newAdapter({
      type: this.config.get<'mysql'>('database.type'),
      host: this.config.get('database.host'),
      port: this.config.get('database.port'),
      username: this.config.get('database.username'),
      password: this.config.get<string>('database.password'),
      database: this.config.get<string>('database.database'),
    });
    const filePath = this.config.get('app.CASBIN_CONF_PATH');
    this.enforcer = await newEnforcer(filePath, a);
    // Load the policy from DB.
    this.enforcer.loadPolicy();
  }
}
