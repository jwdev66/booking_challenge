import React, { useState, useMemo } from "react";
import { Container } from "./styled";
import { InputForm, BookingList } from "components";
import { FORM_TYPES } from "utils";

export default function App() {
  const [bookingList, setBookingList] = useState([]);
  const [filters, setFilters] = useState(null);

  const filteredList = useMemo(() => {
    if (!filters) return bookingList;
    return bookingList.filter(
      (booking) =>
        (!filters.attendees || filters.attendees === booking.attendees) &&
        (!filters.roomType || filters.roomType === booking.booked.roomType) &&
        (!filters.roomCapacity ||
          filters.roomCapacity === booking.booked.roomCapacity) &&
        (!filters.bookingDate ||
          filters.bookingDate === booking.booked.bookingDate) &&
        (!filters.timeSlot || filters.timeSlot === booking.booked.timeSlot)
    );
  }, [bookingList, filters]);

  const isValidateBooking = (bookingData) => {
    for (let i = 0; i < bookingList.length; i++) {
      if (
        JSON.stringify(bookingList[i].booked) ===
        JSON.stringify(bookingData.booked)
      ) {
        alert("It's already booked. Please choose other one.");
        return false;
      }
    }

    return true;
  };

  const handleAddBooking = (bookingData) => {
    if (isValidateBooking(bookingData)) {
      setBookingList((bookingList) => [...bookingList, bookingData]);
    }
  };

  const handleCancelBooking = (id) => {
    const updatedList = bookingList.filter((booking) => booking.id !== id);
    setBookingList(updatedList);
  };

  return (
    <Container>
      <InputForm handleAddBooking={handleAddBooking} />
      <InputForm
        formType={FORM_TYPES.FILTER_FORM}
        handleAddBooking={handleAddBooking}
        handleFilterBooking={(filters) => setFilters(filters)}
        handleClearFilter={() => setFilters(null)}
      />
      <BookingList
        bookingList={filteredList}
        handleCancelBooking={handleCancelBooking}
      />
    </Container>
  );
}
