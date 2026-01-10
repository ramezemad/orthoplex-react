import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <img
        src="/assets/orthoplex-logo.png"
        alt="Orthoplex Logo"
        style={{ height: "40px" }}
      />

      <div>
        {!user ? (
          <>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={logout} style={styles.btn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#0b1f3b",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: {
    color: "white",
    marginRight: "1rem",
    textDecoration: "none",
  },
  btn: {
    background: "#0fa3b1",
    border: "none",
    padding: "0.5rem 1rem",
    color: "white",
    cursor: "pointer",
  },
};
