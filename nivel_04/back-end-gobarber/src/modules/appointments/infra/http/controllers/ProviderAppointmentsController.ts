import { Request, Response } from "express"

import { container } from 'tsyringe';
import ListProviderAppointmentsServices from "@modules/appointments/services/ListProviderAppointmentsServices";

export default class ProviderAppointmentsController {

  public async index(request: Request, response: Response): Promise<Response> {

    const provider_id = request.user.id;

    const { day, month, year } = request.body;

    const listProviderAppointmentService = container.resolve(ListProviderAppointmentsServices);

    const appointments = await listProviderAppointmentService.execute({
      provider_id,
      month,
      day,
      year,
    });

    return response.json(appointments);

  }

}
