import { useState } from "react";

function BookingForm({ users, cabins, onCreate }) {
  const [form, setForm] = useState({
    userId: "",
    cabinId: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting:", form); // DEBUG

    if (!form.userId || !form.cabinId || !form.date || !form.startTime || !form.endTime) {
      alert("All fields required!");
      return;
    }

    onCreate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
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