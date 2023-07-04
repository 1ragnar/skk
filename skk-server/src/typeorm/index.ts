import { Bus } from './bus.entity';
import { User } from './user.entity';
import { Route } from './route.entity';
import { Ticket } from './ticket.entity';
import { Seat } from './seat.entity';
import { Payment } from './payment.entity';

const entities = [User, Bus, Route, Seat, Ticket, Payment];

export { User, Bus, Route, Seat, Ticket, Payment };
export default entities;
