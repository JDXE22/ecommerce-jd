import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUsersDTO } from './dto/createUsers.dto';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository = {
    getAllUsers: jest
      .fn()
      .mockResolvedValue([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ]),
    save: jest
      .fn()
      .mockImplementation((user) => Promise.resolve({ id: Date.now, ...user })),
    getUserById: jest.fn((id) =>
      Promise.resolve({
        id,
        name: 'Chill',
        email: 'chillguy@gmail.com',
        address: '1234 Fake St',
        isAdmin: false,
        phone: '123-456-7890',
        country: 'Canada',
        city: 'Vancouver',
        createdAt: new Date('2023-12-01T00:00:00Z'),
        orders: [],
      }),
    ),
    updateUser: jest.fn((id, updatedUser) =>
      Promise.resolve({
        id: '1234fs-234sd-24csfd-34sdfg',
        ...updatedUser,
      }),
    ),
  };
  let jwtService: JwtService;

  const mockUser: CreateUsersDTO = {
    name: 'Chill',
    email: 'chillguy@gmail.com',
    password: '1234567',
    address: '1234 Fake St',
    isAdmin: false,
    phone: '123-456-7890',
    country: 'Canada',
    city: 'Vancouver',
    createdAt: new Date('2023-12-01T00:00:00Z'),
  };

  // const {password, ...userWithOutPassword} = mockUser

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getAllUsers should return an array of users', async () => {
    const users = await mockUsersRepository.getAllUsers();
    expect(users).toEqual([
      { id: 1, name: 'John Doe', email: 'john@example.com' },
    ]);
  });

  it('save() should return a new user with an OK status', async () => {
    expect(await mockUsersRepository.save(mockUser)).toEqual({
      id: Date.now,
      ...mockUser,
    });
  });

  it('getUserById should return a user with an OK status', async () => {
    const { password, ...userWithOutPassword } = mockUser;
    const id = '1234fs-234sd-24csfd-34sdfg';
    const user = await mockUsersRepository.getUserById(id);

    expect(user).toEqual({
      ...userWithOutPassword,
      id,
      orders: [],
    });
  });

  it('updateUser should return an user updated with the id', async () => {
    const updatedUser = {
      address: '12345 Fake St',
    };
    const id = '1234fs-234sd-24csfd-34sdfg';

    const user = await mockUsersRepository.updateUser( id, updatedUser);

    expect(user).toEqual({
      id,
      ...updatedUser,
    });
  });
});
