import { Controller, Get, UseGuards } from '@nestjs/common';
import { DisplayService } from './display.service';
import { AuthGuard } from 'src/common/auth.guard';
import { Interval } from '@nestjs/schedule';

@Controller('display')
export class DisplayController {
	private readonly pageNumber = 0;

	constructor(private readonly doorService: DisplayService) {}

	@Interval(1000)
  @UseGuards(AuthGuard)
  @Get('/refresh')
  async refreshDisplay() {
		switch (this.pageNumber) {
			case 0: {
				this.doorService.showStatus();
				break;
			}
		}
  }
}
