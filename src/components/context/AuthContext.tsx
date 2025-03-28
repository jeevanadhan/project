import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of user data
interface AuthContextType {
  user: { email: string } | null;
  login: (email: string) => void;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap around the app
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = (email: string) => {
    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email })); // Save to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
