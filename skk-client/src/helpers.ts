import { IRoute, ISeat } from "components/Routes/RouteListItem/RouteListItem";

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  return date.toLocaleString("en-GB", options);
};

export const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  return date.toLocaleTimeString("en-US", options);
};

export const getAvailableSeats = (seats: ISeat[]) => {
  const availableSeatsCount = seats.filter((seat) => seat.is_available).length;

  return availableSeatsCount;
};
