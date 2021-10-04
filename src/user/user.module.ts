import { FactoryProvider, Module } from '@nestjs/common';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { MockUserService } from './mock-user.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

export const MOCK_SERVICE = Symbol('MOCK_SERVICE');

export interface IMockSerice {
  api: string;
  appName: string;
}

const HSM_FACTORY: FactoryProvider = {
  provide: UserService,
  useFactory: (envService: EnvService, mockApi: IMockSerice) => {
    console.log('envService.env :>> ', envService.shouldMock);
    return envService.shouldMock
      ? new MockUserService(mockApi)
      : new UserService(mockApi);
  },
  inject: [EnvService, MOCK_SERVICE],
};

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: MOCK_SERVICE,
      useFactory: (): IMockSerice => {
        return {
          api: 'localhost:4200',
          appName: 'Angular',
        };
      },
      inject: [],
    },
    HSM_FACTORY,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
