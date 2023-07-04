import React from "react";
import { Typography, Button } from "@mui/material";
import moment from "moment";
import { CustomCard, CustomCardContent, CustomDivider, Header } from "./styled";
import { formatDate, formatTime } from "helpers";

interface TicketListItemProps {
  ticket: ITicket;
  onCancelPurchase: () => void;
}

export interface ITicket {
  id: number;
  seat: {
    id: number;
    seatNumber: number;
    price: number;
  };
  bus: { id: number; busNumber: number };
  route: {
    id: number;
    arrivalLocation: string;
    departureLocation: string;
    distanceKm: number;
    travelDurationMin: number;
    departureTime: string;
    arrivalTime: string;
  };
}

const TicketListItem: React.FC<TicketListItemProps> = ({
  ticket,
  onCancelPurchase,
}) => {
  const futureDate = moment().add(1, "hour");

  const isDateInPast = (date: string) => {
    return moment(date).isBefore(futureDate);
  };
  const isDateInPastPlusOneHour = isDateInPast(ticket.route.departureTime);

  return (
    <CustomCard>
      <Header>
        <Typography variant="h6">Bus Ticket</Typography>
      </Header>
      <CustomCardContent>
        <Typography variant="subtitle1">
          Seat Number: {ticket.seat.seatNumber}
        </Typography>
        <CustomDivider />
        <Typography variant="body1">
          From: {ticket.route.departureLocation}
        </Typography>
        <Typography variant="body1">
          To: {ticket.route.arrivalLocation}
        </Typography>
        <Typography variant="body1">
          {`Departure time: ${formatDate(new Date(ticket.route.departureTime))}
      ${formatTime(new Date(ticket.route.departureTime))}`}
        </Typography>
        <Typography variant="body1">
          {`Arrival time: ${formatDate(new Date(ticket.route.arrivalTime))}
      ${formatTime(new Date(ticket.route.arrivalTime))}`}
        </Typography>

        <CustomDivider />
        {!isDateInPastPlusOneHour ? (
          <Button
            variant="contained"
            onClick={() => {
              onCancelPurchase();
            }}
          >
            Cancel purchase
          </Button>
        ) : (
          <Typography variant="body1">
            The time to cancel the ticket has passed
          </Typography>
        )}
      </CustomCardContent>
    </CustomCard>
  );
};

export default TicketListItem;
