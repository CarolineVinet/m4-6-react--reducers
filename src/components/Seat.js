import React, { useContext } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { SeatContext } from "./SeatContext";
import seatimage from "../assets/seat-available.svg";
import { getSeatNum } from "../helpers";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";

const Seat = ({ isBooked, rowName, seatIndex, seatId, seatFilter }) => {
  const { state } = useContext(SeatContext);

  const {
    actions: { beginBookingProcess },
  } = useContext(BookingContext);

  const seats = state.seats;

  return (
    <Tippy
      content={
        "Row " +
        rowName +
        ", Seat " +
        getSeatNum(seatIndex) +
        " - $" +
        seats[seatId].price
      }
    >
      <SeatButton
        onClick={() => {
          beginBookingProcess({ price: seats[seatId].price, seatId: seatId });
        }}
        disabled={isBooked}
      >
        <SeatImage style={{ filter: seatFilter }} src={seatimage}></SeatImage>
      </SeatButton>
    </Tippy>
  );
};

export default Seat;

const SeatImage = styled.img``;

const SeatButton = styled.button``;
