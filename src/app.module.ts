import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DoorModule } from './door/door.module';

@Module({
  imports: [ConfigModule.forRoot(), DoorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
