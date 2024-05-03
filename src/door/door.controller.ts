import { Controller, Post, UseGuards } from '@nestjs/common';
import { DoorService } from './door.service';
import { AuthGuard } from '../common/auth.guard';
import { ActivateRelayFailedException } from './door.exceptions';

@Controller('door')
export class DoorController {
  constructor(private readonly doorService: DoorService) {}

  @UseGuards(AuthGuard)
  @Post('/open')
  async openDoor() {
    const result = await this.doorService.activateRelay();
    if (!result) {
      throw new ActivateRelayFailedException();
    }
  }
}
