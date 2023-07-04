import React, { useState } from "react";
import { Button, Dialog, DialogActions, Typography, Grid } from "@mui/material";
import { IRoute, ISeat } from "components/Routes/RouteListItem/RouteListItem";
import SeatPicker from "components/SeatPicker/SeatPicker";
import { formatDate, formatTime } from "helpers";
import {
  CustomEastIcon,
  CustomSouthIcon,
  DateContainer,
  LeftContainer,
  ModalBody,
  ModalTitle,
  PriceData,
  RightContainer,
  RowData,
  TextMarginTop10,
} from "./styles";

interface IPurchaseModal {
  isVisible: boolean;
  onClose: () => void;
  route: IRoute;
  onBuy: (selectedSeat: ISeat) => void;
}

const PurchaseModal: React.FC<IPurchaseModal> = ({
  isVisible,
  onClose,
  route,
  onBuy,
}) => {
  const [selectedSeat, setSelectedSeat] = useState<ISeat | null>(null);

  const handleSeatSelect = (seat: ISeat) => {
    if (selectedSeat && selectedSeat.id === seat.id) {
      setSelectedSeat(null);
    } else if (seat.is_available) {
      setSelectedSeat(seat);
    }
  };

  const handleBuyTicket = () => {
    selectedSeat && onBuy(selectedSeat);
  };

  return (
    <Dialog open={isVisible} onClose={onClose} fullWidth={true} maxWidth={"md"}>
      <ModalTitle>Buy Ticket</ModalTitle>
      <ModalBody>
        <LeftContainer>
          <SeatPicker
            selectedSeat={selectedSeat}
            seats={route.bus.seats}
            onSeatSelect={handleSeatSelect}
          />
        </LeftContainer>
        <RightContainer>
          <DateContainer>
            <Typography variant="subtitle1" fontWeight={"bold"}>
              {formatDate(new Date(route.departureTime))}
            </Typography>
            <CustomEastIcon />
            <Typography variant="subtitle1">
              {formatDate(new Date(route.arrivalTime))}
            </Typography>
          </DateContainer>
          <RowData>
            <Grid>
              <TextMarginTop10 variant="h6">
                {formatTime(new Date(route.departureTime))}
              </TextMarginTop10>
              <TextMarginTop10 variant="h6">
                {formatTime(new Date(route.arrivalTime))}
              </TextMarginTop10>
            </Grid>
            <CustomSouthIcon />
            <Grid>
              <TextMarginTop10 variant="h6">
                {route.departureLocation}
              </TextMarginTop10>
              <TextMarginTop10 variant="h6">
                {route.arrivalLocation}
              </TextMarginTop10>
            </Grid>
          </RowData>
          <PriceData>
            <Typography variant="h6">
              Price: {route.bus.seats[0].ticket_price} €
            </Typography>
          </PriceData>
        </RightContainer>
      </ModalBody>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleBuyTicket}
          color="primary"
          disabled={!selectedSeat}
          variant="contained"
        >
          Buy Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PurchaseModal;
