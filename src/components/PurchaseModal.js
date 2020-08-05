import React, { useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price },
    actions: { cancelBooking },
  } = useContext(BookingContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  let rowLetter = "";
  let seatNumber = "";

  if (selectedSeatId) {
    const seatArray = selectedSeatId.split("-");
    rowLetter = seatArray[0];
    seatNumber = seatArray[1];
  }

  return (
    <Dialog onClose={cancelBooking} open={selectedSeatId !== null}>
      <DialogContent>
        <DialogTitle>Purchase ticket</DialogTitle>
        <DialogText>
          You're purchasing <Bold>1</Bold> ticket for price of ${price}.
        </DialogText>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Row</TableCell>
              <TableCell>Seat</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{rowLetter}</TableCell>
              <TableCell>{seatNumber}</TableCell>
              <TableCell>{price}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div>
          <DialogTitle>Enter payment details</DialogTitle>
          <DialogActions>
            <form>
              <TextField
                onChange={(event) => {
                  setCreditCard(event.target.value);
                }}
                id="outlined-basic"
                label="Credit Card"
                type="number"
                required
              ></TextField>
              <TextField
                onChange={(event) => {
                  setExpiration(event.target.value);
                }}
                id="outlined-basic"
                label="Expiration"
                type="number"
                required
              ></TextField>
              <Button variant="contained" color="primary">
                Purchase
              </Button>
            </form>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;

const Bold = styled.span`
  font-weight: bold;
`;
