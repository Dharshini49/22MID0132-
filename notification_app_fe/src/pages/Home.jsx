import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkaGFyc2hpbmkucjIwMjJhQHZpdHN0dWRlbnQuYWMuaW4iLCJleHAiOjE3Nzg5Mjk2NzUsImlhdCI6MTc3ODkyODc3NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjYyZDBmZTA4LTM5ZjQtNDQyNi04MGE0LTcxYWZhYTlkNWQ1NSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImRoYXJzaGluaSIsInN1YiI6IjFlYWZkYjA3LTk0ZjYtNDMwZC05ZTU3LTViNDIwMWZhYzUxMSJ9LCJlbWFpbCI6ImRoYXJzaGluaS5yMjAyMmFAdml0c3R1ZGVudC5hYy5pbiIsIm5hbWUiOiJkaGFyc2hpbmkiLCJyb2xsTm8iOiIyMm1pZDAxMzIiLCJhY2Nlc3NDb2RlIjoiU2ZGdVdnIiwiY2xpZW50SUQiOiIxZWFmZGIwNy05NGY2LTQzMGQtOWU1Ny01YjQyMDFmYWM1MTEiLCJjbGllbnRTZWNyZXQiOiJraGtkbXlna1ZTUkpna1FlIn0.7GRJzB2eJLQ_yUXS9kiKbt8GFu9qBgrw-uG9pDvrx-w";

  useEffect(() => {
    fetchNotifications();
  }, [filter, page]);

  const fetchNotifications = async () => {
    try {
      let url = `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=10`;

      if (filter !== "All") {
        url += `&notification_type=${filter}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = response.data.notifications || [];

      // Priority sorting
      const priority = {
        Placement: 1,
        Result: 2,
        Event: 3,
      };

      data.sort((a, b) => {
        if (priority[a.Type] !== priority[b.Type]) {
          return priority[a.Type] - priority[b.Type];
        }

        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#88a9f1",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Campus Notifications
      </h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Placement")}>Placement</button>
        <button onClick={() => setFilter("Result")}>Result</button>
        <button onClick={() => setFilter("Event")}>Event</button>
      </div>

      {/* Notifications */}
      <div>
        {notifications.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1f2937",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>{item.Type}</h3>

            <p>{item.Message}</p>

            <small>{item.Timestamp}</small>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;