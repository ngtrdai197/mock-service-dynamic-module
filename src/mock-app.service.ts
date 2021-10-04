import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class MockAppService extends AppService {
  getHello(): string {
    return 'Hello MockAppService!';
  }
}
