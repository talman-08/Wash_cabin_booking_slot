function BookingItem({ booking, onDelete, onEdit }) {
  return (
    <li>
      {booking.userId?.name} | {booking.cabinId?.cabinName} | {booking.date} ({booking.startTime}-{booking.endTime})

      <button onClick={() => onDelete(booking._id)}>Delete</button>

      <button onClick={() => onEdit(booking)}>Edit</button>
    </li>
  );
}

export default BookingItem;