import { Module } from '@nestjs/common';
import { DisplayController } from './display.controller';
import { DisplayService } from './display.service';

@Module({
  controllers: [DisplayController],
  providers: [DisplayService]
})
export class DisplayModule {}
