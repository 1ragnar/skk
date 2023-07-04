import { MigrationInterface, QueryRunner } from 'typeorm';
import { fa, faker } from '@faker-js/faker';
import { Bus } from '../bus.entity';
import { Seat } from '../seat.entity';
import { Route } from '../route.entity';
import { CRO_BUS_STATIONS } from '../../modules/helpers/croBusStations';
import * as moment from 'moment';

const BUS_CAPACITY = 36;
const DEPARTURE_LOCATION = 'Sisak';

export class FillDatabase1688326568629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //populate bus table
    const busesData: Partial<Bus>[] = generateBusesData();
    const savedBuses = await queryRunner.manager
      .getRepository(Bus)
      .save(busesData);

    //populate routes table
    const routesData: Partial<Route>[] = generateRoutesData(savedBuses);
    const savedRoutes = await queryRunner.manager
      .getRepository(Route)
      .save(routesData);

    //populate seats table
    const seatsData: Partial<Seat>[] = generateSeatsData(
      savedBuses,
      savedRoutes,
    );
    await queryRunner.manager.getRepository(Seat).save(seatsData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Seat).clear();
    await queryRunner.manager.getRepository(Route).clear();
    await queryRunner.manager.getRepository(Bus).clear();
  }
}

const generateBusesData = () => {
  let buses = [];
  for (let i = 0; i < 200; i++) {
    buses.push({
      bus_number: faker.number.int({ max: 1000 }),
      capacity: BUS_CAPACITY,
    });
  }
  return buses;
};

const generateRoutesData = (savedBuses) => {
  let routes = [];
  for (let i = 0; i < 200; i++) {
    let departure_time = getRandomDate(2);
    let travel_duration_min = faker.number.int({ min: 60, max: 420 });
    let arrival_time = moment(departure_time).add(
      travel_duration_min,
      'minutes',
    );
    routes.push({
      departure_location: DEPARTURE_LOCATION,
      arrival_location: getRandomCity(),
      distance_km: faker.number.int({ min: 100, max: 500 }),
      travel_duration_min,
      arrival_time,
      departure_time,
      buses: savedBuses.slice(i * 10, (i + 1) * 10),
    });
  }
  return routes;
};

const generateSeatsData = (buses: Bus[], routes: Route[]) => {
  let seats = [];
  let i = 0;
  buses.forEach((bus) => {
    let price = faker.number.int({ min: 10, max: 50 });
    while (i < bus.capacity) {
      seats.push({
        bus: bus.id,
        route: routes[i].id,
        seat_number: i + 1,
        is_available: faker.datatype.boolean(),
        ticket_price: price,
      });
      i++;
    }
    i = 0;
  });
  return seats;
};

const getRandomCity = () => {
  const shuffled = [...CRO_BUS_STATIONS.sort(() => 0.5 - Math.random())];
  let city = shuffled[0];
  return city;
};

const getRandomDate = (maxDays: number) => {
  const randomValueDays = faker.number.int({ min: 0, max: maxDays });
  const randomValueHours = faker.number.int({ min: 2, max: 25 });
  const futureDate = moment()
    .add(randomValueHours, 'hours')
    .add(randomValueDays, 'days');

  return futureDate.toDate();
};
