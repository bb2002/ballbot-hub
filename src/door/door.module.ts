import { Module } from '@nestjs/common';
import { DoorController } from './door.controller';
import { DoorService } from './door.service';

@Module({
  controllers: [DoorController],
  providers: [DoorService],
  exports: [DoorService],
})
export class DoorModule {}
