import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { TextField, Button, Typography, Paper } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_USER_SERVICE_URL}/users/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        withCredentials: true,
      });
      console.log("Full response object:", response); 
      console.log("Response data:", response.data); 
      if (response.data.user && response.data.user.email) {
        setUser({
          email: response.data.user.email,
          id: response.data.user.id,
          user_name: response.data.user.user_name,
        });
        console.log(response.data)
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : "Server error");
      alert("Login failed!");
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5" style={{ marginBottom: 20 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: 20 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: 20 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
}

export default Login;
