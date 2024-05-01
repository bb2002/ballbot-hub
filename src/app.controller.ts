import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  @Render('index')
  getHello() {
    const secretKey =
      (
        (this.configService.get('AUTHORIZATION_TOKEN') as string) ?? ''
      ).substring(0, 3) + '***';

    return { uptime: process.uptime(), secretKey };
  }
}
