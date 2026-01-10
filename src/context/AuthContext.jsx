import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedUser"))
  );

  const register = ({ username, email, password }) => {
    const users = getUsers();

    if (users.find((u) => u.username === username)) {
      throw new Error("Username already exists");
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
  };

  const login = ({ username, password }) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!found) throw new Error("Invalid credentials");

    setUser({ username });
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({ username })
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
