import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DoorService } from './door/door.service';

@Controller()
export class AppController {
  constructor(
    private readonly doorService: DoorService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Render('index')
  getHello() {
    const secretKey =
      (
        (this.configService.get('AUTHORIZATION_TOKEN') as string) ?? ''
      ).substring(0, 3) + '***';

    return {
      uptime: process.uptime(),
      secretKey,
      door: this.doorService.canUseGPIO(),
    };
  }
}
