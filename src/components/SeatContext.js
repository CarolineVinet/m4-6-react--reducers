import React from "react";
export const SeatContext = React.createContext();

const initialState = {
  hasloaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
  bookedSeats: {},
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        hasloaded: action.hasloaded,
        seats: action.seats,
        numOfRows: action.numOfRows,
        bookedSeats: action.bookedSeats,
        seatsPerRow: action.seatsPerRow,
      };
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    console.log(data);
    dispatch({
      type: "receive-seat-info-from-server",
      hasloaded: true,
      seats: data.seats,
      bookedSeats: data.bookedSeats,
      numOfRows: data.numOfRows,
      seatsPerRow: data.seatsPerRow,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
