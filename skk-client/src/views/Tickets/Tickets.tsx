import api from "api";
import { useAppContext } from "AppContext";
import React, { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import TicketListItem from "./TicketListItem/TicketListItem";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";

export type ITicketsProps = {};

const Tickets: React.FC<ITicketsProps> = ({}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [state] = useAppContext();
  const [tickets, setTickets] = useState<any[]>([]);
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await api.tickets.getUserTickets(state.user.id);
      setTickets(response.data);
    } catch (e) {
      enqueueSnackbar("Something went wrong. Please try again...", {
        variant: "error",
      });
    }
  };

  const handleCancelPurchase = useCallback(
    async (ticket: any) => {
      try {
        await api.tickets.cancelTicket({ id: ticket.id });
        setTickets([...tickets.filter((_ticket) => _ticket.id !== ticket.id)]);
      } catch (e) {
        enqueueSnackbar("Error occurred during payment cancelation", {
          variant: "error",
        });
      }
    },
    [tickets]
  );

  return (
    <List>
      {tickets.length === 0 ? (
        <Typography textAlign={"center"}>You don't have any ticket</Typography>
      ) : (
        tickets.map((ticket, index) => (
          <TicketListItem
            key={index}
            ticket={ticket}
            onCancelPurchase={() => handleCancelPurchase(ticket)}
          />
        ))
      )}
    </List>
  );
};

export { Tickets };
