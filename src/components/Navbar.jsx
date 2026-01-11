import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      {/* LEFT: Logo + Brand */}
      <div style={styles.brand}>
        <img
          src="/assets/orthoplex-logo.png"
          alt="Orthoplex Logo"
          style={styles.logo}
        />
        <span style={styles.brandText}>Orthoplex</span>
      </div>

      {/* RIGHT: Navigation */}
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
    padding: "1rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },

  logo: {
    height: "40px",
  },

  brandText: {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },

  link: {
    color: "white",
    marginRight: "1rem",
    textDecoration: "none",
    fontWeight: 500,
  },

  btn: {
    background: "#0fa3b1",
    border: "none",
    padding: "0.5rem 1rem",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
