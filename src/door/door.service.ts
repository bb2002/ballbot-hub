import { Injectable, Logger } from '@nestjs/common';
import { promise as GPIO } from 'rpi-gpio';
import { sleep } from 'src/common/utils';

@Injectable()
export class DoorService {
  private readonly logger = new Logger(DoorService.name);
  private GPIOSetupResult = false;

  private readonly PIN_DOOR_RELAY = 5;

  constructor() {
    Promise.all([GPIO.setup(this.PIN_DOOR_RELAY, GPIO.DIR_OUT)])
      .then(() => {
        this.logger.log('GPIO Setup OK.');
        this.GPIOSetupResult = true;
      })
      .catch((ex) => {
        this.logger.error('Failed to setup GPIO.');
        this.logger.error(ex);
      });
  }

  canUseGPIO(): boolean {
    return this.GPIOSetupResult;
  }

  async activateRelay(): Promise<boolean> {
    if (!this.canUseGPIO()) {
      return false;
    }

    return GPIO.write(this.PIN_DOOR_RELAY, true)
      .then(() => sleep(1000))
      .then(() => GPIO.write(this.PIN_DOOR_RELAY, false))
      .then(() => true)
      .catch((ex) => {
        console.error(ex);
        return false;
      });
  }
}
