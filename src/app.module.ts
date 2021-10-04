import { FactoryProvider, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';
import { MockAppService } from './mock-app.service';
import { UserModule } from './user/user.module';

const HSM_FACTORY: FactoryProvider = {
  provide: AppService,
  useFactory: (envService: EnvService) => {
    console.log('envService.shouldMock :>> ', envService.shouldMock);
    return envService.shouldMock ? new MockAppService() : new AppService();
  },
  inject: [EnvService],
};
const env = true;

@Module({
  imports: [EnvModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: env ? MockAppService : AppService,
    },
    HSM_FACTORY,
  ],
})
export class AppModule {}
