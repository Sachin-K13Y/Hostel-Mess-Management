import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWardenSummary,
  fetchWardenRecent,
} from "../features/warden/wardenSlice";
import { useNavigate } from "react-router-dom";

export default function WardenDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { summary, recent, loading } = useSelector((state) => state.warden);

  useEffect(() => {
    dispatch(fetchWardenSummary());
    dispatch(fetchWardenRecent());
  }, [dispatch]);

  if (loading || !summary || !recent) return <p style={{ padding: 30 }}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Warden Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => navigate("/warden/complaints")}>
          <h3>Complaints</h3>
          <p>Total: {summary.complaints.total}</p>
          <p>Pending: {summary.complaints.pending}</p>
          <p>In Progress: {summary.complaints.inProgress}</p>
          <p>Resolved: {summary.complaints.resolved}</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/warden/leaves")}>
          <h3>Leaves</h3>
          <p>Total: {summary.leaves.total}</p>
          <p>Pending: {summary.leaves.pending}</p>
          <p>Approved: {summary.leaves.approved}</p>
          <p>Rejected: {summary.leaves.rejected}</p>
        </div>

        <div style={styles.card} onClick={() => navigate("/warden/broadcast")}>
          <h3>Broadcast</h3>
          <p>Send notification to all students</p>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 style={{ marginTop: 30 }}>Recent Activity</h2>

      <div style={styles.recentContainer}>
        <div style={styles.recentBox}>
          <h3>Recent Complaints</h3>
          {recent.recentComplaints.length === 0 ? (
            <p>No recent complaints</p>
          ) : (
            recent.recentComplaints.map((c) => (
              <div key={c._id} style={styles.recentItem}>
                <b>{c.category}</b> – {c.status}
                <p style={styles.date}>{new Date(c.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        <div style={styles.recentBox}>
          <h3>Recent Leaves</h3>
          {recent.recentLeaves.length === 0 ? (
            <p>No recent leaves</p>
          ) : (
            recent.recentLeaves.map((l) => (
              <div key={l._id} style={styles.recentItem}>
                <b>{l.reason}</b> – {l.status}
                <p style={styles.date}>{new Date(l.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f6f6f6",
    minHeight: "100vh",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    width: "280px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
  },
  recentContainer: {
    marginTop: "20px",
    display: "flex",
    gap: "20px",
  },
  recentBox: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
  },
  recentItem: {
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  date: {
    fontSize: "12px",
    color: "#777",
  },
};
