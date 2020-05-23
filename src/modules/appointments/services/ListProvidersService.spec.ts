import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakesUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakesUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakesUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakesUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'qwer1234',
    });

    const user2 = await fakesUsersRepository.create({
      name: 'John Trê',
      email: 'john@tre.com',
      password: 'qwer1234',
    });

    const loggedUser = await fakesUsersRepository.create({
      name: 'John Qua',
      email: 'john@qua.com',
      password: 'qwer1234',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
