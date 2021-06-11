import React, { useState } from "react";
import { Form, Input, Select, Option, Button } from "./styled";
import { ROOM_TYPES, ROOM_CAPACITIES, TIME_SLOTS, FORM_TYPES } from "utils";
import PropTypes from 'prop-types';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

export default function InputForm({
  handleAddBooking,
  handleClearFilter,
  handleFilterBooking,
  formType = FORM_TYPES.BOOKING_FORM,
}) {
  const [roomType, setRoomType] = useState("none");
  const [roomCapacity, setRoomCapacity] = useState("none");
  const [attendees, setAttendees] = useState(0);
  const [bookingDate, setBookingDate] = useState(() =>
    formType === FORM_TYPES.BOOKING_FORM ? new Date() : ""
  );
  const [timeSlot, setTimeSlot] = useState("none");

  const isValidateBookingData = () => {
    if (
      roomType === "none" ||
      roomCapacity === "none" ||
      !attendees ||
      !bookingDate ||
      timeSlot === "none"
    ) {
      alert("Please Input All Data");
      return false;
    }
    return true;
  };

  const addBooking = () => {
    if (!isValidateBookingData()) return;

    const bookingData = {
      id: moment().seconds(),
      attendees,
      booked: {
        roomType,
        roomCapacity,
        bookingDate: moment(bookingDate).format("MM-DD-YYYY"),
        timeSlot,
      },
    };

    handleAddBooking(bookingData);
  };

  const filterBooking = () => {
    const filters = {};
    if (attendees > 0) filters.attendees = attendees;
    if (roomType !== "none") filters.roomType = roomType;
    if (roomCapacity !== "none") filters.roomCapacity = roomCapacity;
    if (timeSlot !== "none") filters.timeSlot = timeSlot;
    if (bookingDate)
      filters.bookingDate = moment(bookingDate).format("MM-DD-YYYY");

    handleFilterBooking(filters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === FORM_TYPES.BOOKING_FORM) {
      addBooking();
    } else {
      filterBooking();
    }
  };

  const handleAttendees = (event) => {
    const regex = /^[0-9\b]+$/;
    const value = event.target.value;
    if (value === "" || regex.test(value)) {
      setAttendees(parseInt(value));
    }
  };

  const clearFilter = () => {
    setRoomType("none");
    setRoomCapacity("none");
    setAttendees(0);
    setBookingDate("");
    setTimeSlot("none");

    handleClearFilter();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select onChange={(e) => setRoomType(e.target.value)} value={roomType}>
        <Option value={"none"}>Select Room Type</Option>
        {Object.keys(ROOM_TYPES).map((roomTypeKey) => {
          return (
            <Option value={roomTypeKey} key={roomTypeKey}>
              {ROOM_TYPES[roomTypeKey]}
            </Option>
          );
        })}
      </Select>
      <Select
        onChange={(e) => setRoomCapacity(e.target.value)}
        value={roomCapacity}
      >
        <Option value={"none"}>Select Room Capacity</Option>
        {Object.keys(ROOM_CAPACITIES).map((roomCapacityKey) => {
          return (
            <Option value={roomCapacityKey} key={roomCapacityKey}>
              {ROOM_CAPACITIES[roomCapacityKey]}
            </Option>
          );
        })}
      </Select>
      <Input
        type="number"
        placeholder="Attendees"
        onChange={handleAttendees}
        value={attendees}
      />
      <DatePicker
        selected={bookingDate}
        onChange={(date) => setBookingDate(date)}
        placeholderText="Booking Date"
      />
      <Select onChange={(e) => setTimeSlot(e.target.value)} value={timeSlot}>
        <Option value={"none"}>Select Time Slot</Option>
        {Object.keys(TIME_SLOTS).map((timeSlotKey) => {
          return (
            <Option value={timeSlotKey} key={timeSlotKey}>
              {TIME_SLOTS[timeSlotKey]}
            </Option>
          );
        })}
      </Select>
      <Button type="submit">
        {formType === FORM_TYPES.BOOKING_FORM ? "Book" : "Filter"}
      </Button>
      {formType === FORM_TYPES.FILTER_FORM && (
        <Button onClick={clearFilter}>Clear Filter</Button>
      )}
    </Form>
  );
}

InputForm.propTypes = {
  handleAddBooking: PropTypes.func,
  handleClearFilter: PropTypes.func,
  handleFilterBooking: PropTypes.func,
  formType: PropTypes.string,
};

InputForm.defaultProps = {
  handleAddBooking: () => {},
  handleClearFilter: () => {},
  handleFilterBooking: () => {},
  formType: FORM_TYPES.BOOKING_FORM,
};
