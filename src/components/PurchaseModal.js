import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId },
    actions: { cancelBooking },
  } = useContext(BookingContext);

  return (
    <Dialog onClose={cancelBooking} open={selectedSeatId !== null}>
      <div>HELLO</div>
    </Dialog>
  );
};

export default PurchaseModal;
