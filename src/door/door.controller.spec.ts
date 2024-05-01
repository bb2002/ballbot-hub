import { Test, TestingModule } from '@nestjs/testing';
import { DoorController } from './door.controller';

describe('DoorController', () => {
  let controller: DoorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoorController],
    }).compile();

    controller = module.get<DoorController>(DoorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
