import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const VITE_NODE_END_POINT =
    import.meta.env.VITE_NODE_END_POINT || "http://localhost:5000/api";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we had a /me endpoint we could verify the token here
    // For now, if we have a token, we just decode it or trust the stored user data
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${VITE_NODE_END_POINT}/auth/login`, {
        email,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${VITE_NODE_END_POINT}/auth/register`, {
        name,
        email,
        password,
      });
      // Registration successful, but usually we don't login automatically unless the API returns a token
      // Let's assume register doesn't login directly
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const sendOtp = async (email) => {
    try {
      const res = await axios.post(`${VITE_NODE_END_POINT}/auth/send-otp`, {
        email,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to send OTP";
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      const res = await axios.post(`${VITE_NODE_END_POINT}/auth/verify-otp`, {
        email,
        otp,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to verify OTP";
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        sendOtp,
        verifyOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
