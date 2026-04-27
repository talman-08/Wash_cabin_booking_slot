import { useEffect, useState } from "react";
import "./App.css";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";

function App() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [cabins, setCabins] = useState([]);

  const [editingBooking, setEditingBooking] = useState(null);

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

  // ⭐ FILTER STATE
  const [searchDate, setSearchDate] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const url = editingBooking
        ? `http://localhost:8000/api/bookings/${editingBooking._id}`
        : "http://localhost:8000/api/bookings";

      const method = editingBooking ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message);
        return;
      }

      setMessage(editingBooking ? "Booking updated ✏️" : "Booking created ✅");

      setEditingBooking(null);

      setForm({
        userId: "",
        cabinId: "",
        date: "",
        startTime: "",
        endTime: ""
      });

      fetchData();

    } catch {
      setError("Error saving booking");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/bookings/${id}`, {
        method: "DELETE"
      });

      setMessage("Booking deleted 🗑️");
      fetchData();
    } catch {
      setError("Delete failed");
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);

    setForm({
      userId: booking.userId._id,
      cabinId: booking.cabinId._id,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime
    });
  };

  // ⭐ FILTER LOGIC
  const filteredBookings = bookings.filter((b) =>
    !searchDate || b.date.includes(searchDate)
  );

  return (
    <div className="container">
      <h1>Wash Cabin Booking</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* FORM */}
      <BookingForm
        users={users}
        cabins={cabins}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />

      {/* ⭐ FILTER SECTION (FIXED UI) */}
      <div style={{ marginTop: "20px" }}>
        <label style={{ fontWeight: "bold" }}>Filter bookings by date:</label>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}

      {/* LIST */}
      <BookingList
        bookings={filteredBookings}
        onDelete={deleteBooking}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;












// import { useEffect, useState } from "react";
// import "./App.css";
// import BookingForm from "./components/BookingForm";
// import BookingList from "./components/BookingList";

// function App() {
//   const [bookings, setBookings] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [cabins, setCabins] = useState([]);

//   const [editingBooking, setEditingBooking] = useState(null);

//   const [form, setForm] = useState({
//     userId: "",
//     cabinId: "",
//     date: "",
//     startTime: "",
//     endTime: ""
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   // ⭐ NEW: filter state:-
//   const [searchDate, setSearchDate] = useState("");

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const b = await fetch("http://localhost:8000/api/bookings");
//       const u = await fetch("http://localhost:8000/api/users");
//       const c = await fetch("http://localhost:8000/api/cabins");

//       setBookings(await b.json());
//       setUsers(await u.json());
//       setCabins(await c.json());

//       setLoading(false);
//     } catch (err) {
//       setError("Failed to load data");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     const interval = setInterval(fetchData, 5000);
//     return () => clearInterval(interval);
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const url = editingBooking
//         ? `http://localhost:8000/api/bookings/${editingBooking._id}`
//         : "http://localhost:8000/api/bookings";

//       const method = editingBooking ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form)
//       });

//       const result = await res.json();

//       if (!res.ok) {
//         setError(result.message);
//         return;
//       }

//       setMessage(editingBooking ? "Updated ✏️" : "Created ✅");

//       setEditingBooking(null);

//       setForm({
//         userId: "",
//         cabinId: "",
//         date: "",
//         startTime: "",
//         endTime: ""
//       });

//       fetchData();

//     } catch {
//       setError("Error saving booking");
//     }
//   };


//   const deleteBooking = async (id) => {
//     try {
//       await fetch(`http://localhost:8000/api/bookings/${id}`, {
//         method: "DELETE"
//       });

//       setMessage("Booking deleted successfully 🗑️");
//       fetchData();
//     } catch {
//       setError("Delete failed");
//     }
//   };


//   const handleEdit = (booking) => {
//     setEditingBooking(booking);

//     setForm({
//       userId: booking.userId._id,
//       cabinId: booking.cabinId._id,
//       date: booking.date,
//       startTime: booking.startTime,
//       endTime: booking.endTime
//     });
//   };


//   // const handleEdit = async (booking) => {
//   //   const newTime = prompt("Enter new start time:", booking.startTime);

//   //   if (!newTime) return;

//   //   await fetch(`http://localhost:8000/api/bookings/${booking._id}`, {
//   //     method: "PUT",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify({ ...booking, startTime: newTime })
//   //   });

//   //   setMessage("Booking updated ✏️");
//   //   fetchData();
//   // };

//   // FILTER LOGIC CODE:
//   const filteredBookings = bookings.filter((b) =>
//     !searchDate || b.date.includes(searchDate)
//   );

//   return (
//     <div className="container">
//       <h1>Wash Cabin Booking</h1>

//       {message && <p style={{ color: "green" }}>{message}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <BookingForm
//         users={users}
//         cabins={cabins}
//         form={form}
//         setForm={setForm}
//         onSubmit={handleSubmit}
//       />

//       {/*FILTER INPUT IS DONE: */}
//       <input
//         type="date"
//         onChange={(e) => setSearchDate(e.target.value)}
//       />

//       {loading && <p>Loading...</p>}

//       {/*I USE FILTERED DATA + EDIT HERE */}
//       <BookingList
//         bookings={filteredBookings}
//         onDelete={deleteBooking}
//         onEdit={handleEdit}
//       />
//     </div>
//   );
// }

// export default App;