import { InternalServerErrorException } from '@nestjs/common';

export class ActivateRelayFailedException extends InternalServerErrorException {
  constructor() {
    super('GPIO Relay failed');
  }
}
