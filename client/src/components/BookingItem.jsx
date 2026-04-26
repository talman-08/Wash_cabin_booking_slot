function BookingItem({ booking, onDelete }) {
  return (
    <li>
      {booking.userId?.name} | {booking.cabinId?.cabinName} | {booking.date} ({booking.startTime}-{booking.endTime})

      <button onClick={() => onDelete(booking._id)}>
        Delete
      </button>
    </li>
  );
}

export default BookingItem;