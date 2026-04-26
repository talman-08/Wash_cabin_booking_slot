import BookingItem from "./BookingItem";

function BookingList({ bookings, onDelete }) {
  return (
    <ul>
      {bookings.map((b) => (
        <BookingItem key={b._id} booking={b} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default BookingList;