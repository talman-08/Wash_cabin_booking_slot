import BookingItem from "./BookingItem";

function BookingList({ bookings, onDelete, onEdit }) {
  return (
    <ul>
      {bookings.map((b) => (
        <BookingItem
          key={b._id}
          booking={b}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default BookingList;