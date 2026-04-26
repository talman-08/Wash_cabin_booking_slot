import { useEffect, useState } from "react";
import "./App.css";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

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

      <BookingForm
        users={users}
        cabins={cabins}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <BookingList
        bookings={bookings}
        onDelete={deleteBooking}
      />
    </div>
  );
}

export default App;