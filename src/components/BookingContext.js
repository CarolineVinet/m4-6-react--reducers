import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };

    case "cancel-booking-process":
      return {
        ...state,
        selectedSeatId: null,
        price: null,
        status: "idle",
      };
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      selectedSeatId: data.seatId,
      price: data.price,
    });
  };

  const cancelBooking = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBooking,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
