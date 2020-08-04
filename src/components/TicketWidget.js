import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import seatimage from "../assets/seat-available.svg";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  const { state } = useContext(SeatContext);

  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  const bookedSeats = state.bookedSeats;

  if (state.hasloaded === false) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              let isBooked = false;
              let seatFilter = "none";
              if (bookedSeats[seatId]) {
                seatFilter = "grayscale(100%)";
                isBooked = true;
              }

              return (
                <SeatWrapper key={seatId}>
                  <Seat
                    isBooked={isBooked}
                    rowName={rowName}
                    seatIndex={seatIndex}
                    seatId={seatId}
                    seatFilter={seatFilter}
                  ></Seat>
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
