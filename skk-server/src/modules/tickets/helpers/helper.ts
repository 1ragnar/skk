import { Ticket } from 'src/typeorm';

export const transformTicketsData = (dbTickets: Ticket[]) => {
  let seats = dbTickets.flatMap((ticket) => {
    return {
      id: +ticket.id,
      seat: {
        id: +ticket.seat.id,
        seatNumber: +ticket.seat.seat_number,
        price: +ticket.seat.ticket_price,
      },
      bus: { id: +ticket.seat.bus.id, busNumber: +ticket.seat.bus.bus_number },
      route: {
        id: +ticket.seat.route.id,
        arrivalLocation: ticket.seat.route.arrival_location,
        departureLocation: ticket.seat.route.departure_location,
        distanceKm: +ticket.seat.route.distance_km,
        travelDurationMin: +ticket.seat.route.travel_duration_min,
        departureTime: ticket.seat.route.departure_time,
        arrivalTime: ticket.seat.route.arrival_time,
      },
    };
  });

  return seats;
};
