import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log(action.type, action);
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
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.error,
      };
    case "purchase-ticket-success":
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
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

  const purchaseTicket = ({ seatId, creditCard, expiration }) => {
    dispatch({
      type: "purchase-ticket-request",
    });

    fetch("/api/book-seat", {
      method: "POST",
      body: JSON.stringify({
        seatId,
        creditCard,
        expiration,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        if (!res.success) {
          dispatch({
            type: "purchase-ticket-failure",
            error: res.message,
          });
        } else {
          dispatch({
            type: "purchase-ticket-success",
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: "purchase-ticket-failure",
          error: err.message,
        });
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
          purchaseTicket,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
