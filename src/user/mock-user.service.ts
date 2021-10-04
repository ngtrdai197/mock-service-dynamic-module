import { Inject, Injectable } from '@nestjs/common';
import { IMockSerice } from './user.module';
import { UserService } from './user.service';

@Injectable()
export class MockUserService extends UserService {
  constructor(@Inject('MOCK_SERVICE') protected readonly mock: IMockSerice) {
    super(mock);
  }
  public get username(): string {
    return 'Nguyen Dai Mock';
  }
}
