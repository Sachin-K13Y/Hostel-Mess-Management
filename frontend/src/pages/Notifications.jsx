import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../features/notification/notificationSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const markRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Notifications</h2>

      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            style={{
              ...styles.card,
              background: n.read ? "#fff" : "#e8f0fe",
            }}
            onClick={() => markRead(n._id)}
          >
            <h3 style={styles.cardTitle}>{n.title}</h3>
            <p>{n.message}</p>

            <p style={styles.date}>
              {new Date(n.createdAt).toLocaleString()}
            </p>

            {!n.read && <span style={styles.unreadDot}></span>}
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    background: "#f7f7f7",
    minHeight: "100vh",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    marginBottom: "15px",
    position: "relative",
    cursor: "pointer",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  },
  cardTitle: {
    margin: "0 0 8px 0",
  },
  date: {
    fontSize: "12px",
    color: "#777",
    marginTop: "8px",
  },
  unreadDot: {
    position: "absolute",
    right: "15px",
    top: "15px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#007bff",
  },
};
