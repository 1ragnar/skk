import React from "react";
import { ListItem, Button, Grid, Typography } from "@mui/material";
import {
  AvailableSeats,
  BuyButton,
  BuyButtonContainer,
  DurationContainer,
  Line,
  RouteItem,
  TimeAndLocation,
  TimeAndLocationContainer,
} from "./styles";
import { formatDate, formatTime, getAvailableSeats } from "helpers";

export interface IRoute {
  id: number;
  departureLocation: string;
  arrivalLocation: string;
  price: number;
  departureTime: Date;
  arrivalTime: Date;
  distanceKm: number;
  travelDurationMin: number;
  bus: IBus;
  busNumber: number;
  capacity: number;
}

export interface IBus {
  id: number;
  busNumber: number;
  capacity: number;
  seats: ISeat[];
}

export interface ISeat {
  id: number;
  seat_number: number;
  is_available: boolean;
  ticket_price: number;
}
export type IRouteListItemProps = {
  route: IRoute;
  onBuyPress: () => void;
};

const RouteListItem: React.FC<IRouteListItemProps> = ({
  route,
  onBuyPress,
}) => {
  return (
    <RouteItem key={route.id}>
      <TimeAndLocationContainer>
        <Typography>{formatDate(new Date(route.departureTime))}</Typography>
        <Typography>{formatTime(new Date(route.departureTime))}</Typography>
        <Typography>{route.departureLocation}</Typography>
      </TimeAndLocationContainer>
      <DurationContainer>
        <Line />
        <TimeAndLocation>
          <Typography>{route.travelDurationMin} min</Typography>
          <Typography>{Math.trunc(route.distanceKm)} km</Typography>
        </TimeAndLocation>
        <Line />
      </DurationContainer>
      <TimeAndLocationContainer>
        <Typography>{formatDate(new Date(route.arrivalTime))}</Typography>
        <Typography>{formatTime(new Date(route.arrivalTime))}</Typography>

        <Typography>{route.arrivalLocation}</Typography>
      </TimeAndLocationContainer>
      <AvailableSeats>
        <Typography>
          Available seats: {getAvailableSeats(route.bus.seats)}
        </Typography>
      </AvailableSeats>
      <BuyButtonContainer>
        <BuyButton
          variant="contained"
          onClick={() => {
            onBuyPress();
          }}
        >
          Buy ticket
        </BuyButton>
      </BuyButtonContainer>
    </RouteItem>
  );
};

export { RouteListItem };
