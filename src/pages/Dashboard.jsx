import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchData } from "../api/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();

  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setRawData(res.data);

        // transform ONCE
        const formatted = res.data.map((item) => ({
          name: `Post ${item.id}`,
          title: item.title,
          body: item.body,
          titleLength: item.title.length,
          bodyLength: item.body.length,
        }));

        setChartData(formatted);
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
          Welcome, {user?.username}!
        </p>
      </div>

      {rawData.length === 0 ? (
        <div className="dashboard-empty">No data available</div>
      ) : (
        <div className="dashboard-grid">
          {/* LINE CHART */}
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Title Length Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="titleLength"
                  stroke="#1e90ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BAR CHART */}
          <div className="dashboard-card">
            <h3 className="dashboard-card-title">Body Length Comparison</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bodyLength" fill="#ff7a18" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
