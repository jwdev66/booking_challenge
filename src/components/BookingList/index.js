import React from "react";
import { Container, Table, THead, TBody, TR, TH, TD, Button } from "./styled";
import { ROOM_TYPES, ROOM_CAPACITIES, TIME_SLOTS } from "utils";
import PropTypes from 'prop-types';

export default function BookingList({ bookingList, handleCancelBooking }) {
  return (
    <Container>
      <Table>
        <THead>
          <TR>
            <TH>No</TH>
            <TH>Room Type</TH>
            <TH>Room Capacity</TH>
            <TH>Attendees</TH>
            <TH>Booking Date</TH>
            <TH>Booking TimeSlot</TH>
            <TH>Actions</TH>
          </TR>
        </THead>
        <TBody>
          {bookingList.map((booking, index) => (
            <TR key={booking.id}>
              <TD>{index + 1}</TD>
              <TD>{ROOM_TYPES[booking.booked.roomType]}</TD>
              <TD>{ROOM_CAPACITIES[booking.booked.roomCapacity]}</TD>
              <TD>{booking.attendees}</TD>
              <TD>{booking.booked.bookingDate}</TD>
              <TD>{TIME_SLOTS[booking.booked.timeSlot]}</TD>
              <TD>
                <Button onClick={() => handleCancelBooking(booking.id)}>
                  x
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </Container>
  );
}

BookingList.propTypes = {
  bookingList: PropTypes.arrayOf(
    PropTypes.shape({
      attendees: PropTypes.number.isRequired,
      booked: PropTypes.shape({
        roomType: PropTypes.string.isRequired,
        roomCapacity: PropTypes.string.isRequired,
        bookingDate: PropTypes.string.isRequired,
        timeSlot: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  handleCancelBooking: PropTypes.func,
};

BookingList.defaultProps = {
  bookingList: [],
  handleCancelBooking: () => {},
};
