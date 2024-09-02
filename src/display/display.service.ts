import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LCD from 'raspberrypi-liquid-crystal';

@Injectable()
export class DisplayService {
	private readonly logger = new Logger(DisplayService.name);
	private DisplaySetupResult = false;
	private lcd: LCD;

	constructor(
    private readonly configService: ConfigService) {
		try {
			this.lcd = new LCD(1, 0x27, 16, 2);
			this.lcd.beginSync();
			this.lcd.clearSync();
			this.DisplaySetupResult = true;

			this.showStatus();
		} catch (ex) {
			this.logger.error('Failed to setup LCD Display');
			this.logger.error(ex);
		}


	}

	canUseDisplay(): boolean {
    return this.DisplaySetupResult;
  }

	getLCD(): LCD {
		return this.lcd;
	}

	public showStatus() {
		this.lcd.clearSync();
		const uptime = Math.round(process.uptime());
		let char = '';
		
		if (uptime < 60) {
				char = uptime + 's';
		} else if (uptime >= 60 && uptime < 3600) {
				char = (uptime / 60).toFixed(2) + 'm';
		} else if (uptime >= 3600 && uptime < 86400) {
				char = (uptime / 3600).toFixed(2) + 'h';
		} else {
				const days = Math.floor(uptime / 86400);
				const hours = ((uptime % 86400) / 3600).toFixed(2);
				char = days + 'd ' + hours + 'h';
		}
		
		this.lcd.printLineSync(0, 'UpTim ' + char);

		const secretKey =
      (
        (this.configService.get('AUTHORIZATION_TOKEN') as string) ?? ''
      ).substring(0, 3) + '***';

		this.lcd.printLineSync(1, 'SeKey ' + secretKey);
	}
}
