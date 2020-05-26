import FakeAppoimentsRepository from "../repositories/fakes/FakeAppoimentsRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppoimentsRepository;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {

    fakeAppointmentRepository = new FakeAppoimentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );

  });

  it('should be able to list the day availability from provider ', async () => {

    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2020, 4, 20, 11).getTime());

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: '121212',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: '121212',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });



    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    /*
        const availability = await listProviderDayAvailabilityService.execute({
          provider_id: 'user',
          month: 5,
          day: 20,
          year: 2020,
        });*/

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]))

  });

});

