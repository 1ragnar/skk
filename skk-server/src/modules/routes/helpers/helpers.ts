import { Route } from 'src/typeorm';

export const transformRoutesData = (dbRoutes: Route[]) => {
  let routes = dbRoutes.flatMap((route) => {
    // Extract the buses and their seat numbers
    const transformedBuses = route.buses.map((bus) => {
      return {
        id: +bus.id,
        busNumber: +bus.bus_number,
        capacity: +bus.capacity,
        seats: bus.seats.sort((a, b) => {
          return +a.seat_number - +b.seat_number;
        }),
      };
    });

    // Create an array of route objects, each with one bus and multiple seats
    const transformedRouteObjects = transformedBuses.map((bus) => ({
      id: +route.id,
      departureLocation: route.departure_location,
      arrivalLocation: route.arrival_location,
      distanceKm: +route.distance_km,
      travelDurationMin: +route.travel_duration_min,
      departureTime: route.departure_time,
      arrivalTime: route.arrival_time,
      bus: bus,
    }));

    return transformedRouteObjects;
  });
  return routes;
};
