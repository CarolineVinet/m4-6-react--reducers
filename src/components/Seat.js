import React, { useContext } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { SeatContext } from "./SeatContext";
import seatimage from "../assets/seat-available.svg";
import { getSeatNum } from "../helpers";
import styled from "styled-components";

const Seat = ({ isBooked, rowName, seatIndex, seatId, seatFilter }) => {
  const { state } = useContext(SeatContext);

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
      <SeatButton disabled={isBooked}>
        <SeatImage style={{ filter: seatFilter }} src={seatimage}></SeatImage>
      </SeatButton>
    </Tippy>
  );
};

export default Seat;

const SeatImage = styled.img``;

const SeatButton = styled.button``;
