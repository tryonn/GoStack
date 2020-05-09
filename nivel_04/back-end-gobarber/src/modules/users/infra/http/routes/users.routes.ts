import { Router, request, response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UserRepository';


const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepository;
  const { name, email, password } = request.body;

  const createUser = new CreateUserService(userRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const userRepository = new UsersRepository;

  const updateUserAvatarService = new UpdateUserAvatarService(userRepository);

  const user = await updateUserAvatarService.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename
  });

  delete user.password;

  return response.json({ user });
});

export default usersRouter;
