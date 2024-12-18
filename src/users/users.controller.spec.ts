import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    {
      id: 2,
      name: 'Mike Doe',
      email: 'mike@example.com',
    },
  ];
  const mockUsersService = {
    getAllUsers: jest.fn().mockResolvedValue([...mockUsers]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getAllUsers() should return an array with all the users', async () => {
    expect(await controller.getAllUsers()).toEqual([
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
      {
        id: 2,
        name: 'Mike Doe',
        email: 'mike@example.com',
      },
    ]);
  });
});
