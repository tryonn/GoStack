import { Request, Response } from "express";


export default class ProfileController {

  public async update(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;

    const { name, email, old_password, password } = request.body;


    //const user = await updateProfile.execute({});


    return response.json();
  }
}
