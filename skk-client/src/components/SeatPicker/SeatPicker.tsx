import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { ISeat } from "components/Routes/RouteListItem/RouteListItem";
import {
  CustomPaper,
  CustomSeatIcon,
  CustomSelectedSeatIcon,
  FooterContainer,
  FooterRow,
  RootContainer,
  TextMarginTop10,
} from "./styles";

interface SeatPickerProps {
  seats: ISeat[];
  onSeatSelect: (selectedSeat: ISeat) => void;
  selectedSeat: ISeat | null;
}

const SeatPicker: React.FC<SeatPickerProps> = ({
  seats,
  onSeatSelect,
  selectedSeat,
}) => {
  const handleSeatClick = (seat: ISeat) => {
    onSeatSelect(seat);
  };

  return (
    <RootContainer>
      <Typography variant="h6">Select a seat:</Typography>
      <Grid container spacing={1}>
        {seats.map((seat, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            key={seat.seat_number}
            style={{
              marginLeft: index % 2 == 0 && index % 4 !== 0 ? 20 : -10,
            }}
          >
            <CustomPaper elevation={3} onClick={() => handleSeatClick(seat)}>
              {(selectedSeat && selectedSeat.id === seat.id) ||
              !seat.is_available ? (
                <CustomSelectedSeatIcon is_available={seat.is_available} />
              ) : (
                <CustomSeatIcon />
              )}
              <Typography variant="subtitle2">{+seat.seat_number}</Typography>
            </CustomPaper>
          </Grid>
        ))}
      </Grid>
      <FooterContainer>
        <FooterRow>
          <CustomSelectedSeatIcon is_available={false} />
          <TextMarginTop10>Not available</TextMarginTop10>
        </FooterRow>
        <FooterRow>
          <CustomSelectedSeatIcon is_available={true} />
          <TextMarginTop10>Selected</TextMarginTop10>
        </FooterRow>
        <FooterRow>
          <CustomSeatIcon />
          <TextMarginTop10>Available</TextMarginTop10>
        </FooterRow>
      </FooterContainer>
    </RootContainer>
  );
};

export default SeatPicker;
