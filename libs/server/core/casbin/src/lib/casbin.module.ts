import { Module, Global } from '@nestjs/common';
import { CasbinService } from './casbin.service';

@Global()
@Module({
  providers: [CasbinService],
  exports: [CasbinService],
})
export class CasbinModule {}
