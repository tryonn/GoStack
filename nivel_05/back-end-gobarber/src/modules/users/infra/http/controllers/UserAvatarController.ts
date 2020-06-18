import { Request, Response } from "express";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    console.log("request.path.:::::: " + request.path);


    console.log("request:::::: " + request);

    console.log("request.user.id.:::::: " + request.user.id);

    console.log("request.file.filename::::: " + request.file.filename);


    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    return response.json(classToClass(user));
  }
}
