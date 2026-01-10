import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import "./Dashboard.css";


export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load dashboard data");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="dashboard-welcome">
          Welcome back! Here is your latest data.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="dashboard-empty">No data available</div>
      ) : (
        <div className="dashboard-grid">
          {data.map((item) => (
            <div key={item.id} className="dashboard-card">
              <h3 className="dashboard-card-title">{item.title}</h3>
              <p className="dashboard-card-body">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
