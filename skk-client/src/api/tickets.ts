import { ISeat } from "components/Routes/RouteListItem/RouteListItem";
import { api } from "./base";

const buy = (data: { seat: ISeat; user: number }) =>
  api.post("/tickets/buy", data);

const getUserTickets = (id: number) => api.get("/tickets/user/" + id);

const cancelTicket = (data: { id: number }) => api.post("tickets/cancel", data);

export { buy, getUserTickets, cancelTicket };
