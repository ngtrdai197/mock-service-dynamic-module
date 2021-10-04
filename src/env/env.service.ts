import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
  public get shouldMock(): boolean {
    return true;
  }
}
