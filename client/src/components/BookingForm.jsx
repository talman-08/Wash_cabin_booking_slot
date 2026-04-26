import { useState } from "react";

function BookingForm({ users, cabins, form, setForm, onSubmit }) {

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="userId" value={form.userId} onChange={handleChange}>
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <select name="cabinId" value={form.cabinId} onChange={handleChange}>
        <option value="">Select Cabin</option>
        {cabins.map(c => (
          <option key={c._id} value={c._id}>{c.cabinName}</option>
        ))}
      </select>

      <input type="date" name="date" value={form.date} onChange={handleChange} />
      <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />
      <input type="time" name="endTime" value={form.endTime} onChange={handleChange} />

      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;

 