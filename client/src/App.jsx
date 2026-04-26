import { useEffect, useState } from "react";
import "./App.css";

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
  const [message, setMessage] = useState("");

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

    setMessage("");
    setError("");

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
        setError(result.message); // 👈 show error in UI
        return;
      }

      setMessage("Booking created successfully ✅");

      setForm({
        userId: "",
        cabinId: "",
        date: "",
        startTime: "",
        endTime: ""
      });

      fetchData();

    } catch (err) {
      setError("Something went wrong");
    }
  };

 
 

  const deleteBooking = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: "DELETE"
      });

      setMessage("Booking deleted successfully 🗑️");
      fetchData();
    } catch {
      setError("Delete failed");
    }
  };

  return (
    <div>
      <h1>Wash Cabin Booking</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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