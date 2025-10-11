import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("gastrovision_auth_token");
    if (token) {
      setUser({ id: "", name: "", email: "", token }); // Placeholder; fetch real user data if available
      console.log("Token found on mount:", token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      localStorage.setItem("gastrovision_auth_token", data.token);
      console.log("Token stored after login:", data.token);
      setUser({ id: data.id, name: data.name, email: data.email, avatar: data.avatar, token: data.token });
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");
      localStorage.setItem("gastrovision_auth_token", data.token);
      console.log("Token stored after signup:", data.token);
      setUser({ id: data.id, name: data.name, email: data.email, avatar: data.avatar, token: data.token });
      navigate("/dashboard");
      toast.success("Account created successfully");
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast.error(error.message || "Signup failed");
      throw error;
    }
  };

  const googleLogin = async (credential: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Google login failed");
      localStorage.setItem("gastrovision_auth_token", data.token);
      console.log("Token stored after Google login:", data.token);
      setUser({ id: data.id, name: data.name, email: data.email, avatar: data.avatar, token: data.token });
      navigate("/dashboard");
      toast.success("Logged in with Google successfully");
    } catch (error: any) {
      console.error("Google login failed:", error);
      toast.error(error.message || "Google login failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("gastrovision_auth_token");
    setUser(null);
    navigate("/login");
    toast.info("Logged out successfully");
  };

  const value = { user, login, signup, googleLogin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};