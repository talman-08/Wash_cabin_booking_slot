import { useEffect, useState } from "react";

function App() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [cabins, setCabins] = useState([]);

  const [form, setForm] = useState({
    userId: "",
    cabinId: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const b = await fetch("http://localhost:8000/api/bookings");
      const u = await fetch("http://localhost:8000/api/users");
      const c = await fetch("http://localhost:8000/api/cabins");

      setBookings(await b.json());
      setUsers(await u.json());
      setCabins(await c.json());

      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userId || !form.cabinId || !form.date || !form.startTime || !form.endTime) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      setForm({
        userId: "",
        cabinId: "",
        date: "",
        startTime: "",
        endTime: ""
      });

      fetchData();

    } catch (err) {
      console.error(err);
      alert("Error creating booking");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete booking?")) return;

    await fetch(`http://localhost:8000/api/bookings/${id}`, {
      method: "DELETE"
    });

    fetchData();
  };

  return (
    <div>
      <h1>Wash Cabin Booking</h1>

      <form onSubmit={handleSubmit}>
        <select name="userId" value={form.userId} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>{u.name}</option>
          ))}
        </select>

        <select name="cabinId" value={form.cabinId} onChange={handleChange}>
          <option value="">Select Cabin</option>
          {cabins.map((c) => (
            <option key={c._id} value={c._id}>{c.cabinName}</option>
          ))}
        </select>

        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />
        <input type="time" name="endTime" value={form.endTime} onChange={handleChange} />

        <button type="submit">Book</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {bookings.map((b) => (
          <li key={b._id}>
            {b.userId?.name} | {b.cabinId?.cabinName} | {b.date} ({b.startTime}-{b.endTime})
            <button onClick={() => deleteBooking(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;