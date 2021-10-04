import { Inject, Injectable } from '@nestjs/common';
import { IMockSerice } from './user.module';

@Injectable()
export class UserService {
  constructor(@Inject('MOCK_SERVICE') protected readonly mock: IMockSerice) {}
  public get username(): string {
    console.log('this.mock.api :>> ', this.mock.api);
    return 'Nguyen Dai';
  }
}
