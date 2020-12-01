import React, { useState } from "react";
import { useAuthState } from "./AuthProvider";
import axios from "axios";

const LoginForm = () => {
  const { login } = useAuthState();
  const defaultValues = { username: "", password: "", userType: "vendor" };
  const [inputs, setInputs] = useState(defaultValues);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (isSigningUp) {
      try {
        const res = await axios.post("/api/signup", inputs);

        login(res.data);

        setInputs(defaultValues);
        setError("");
      } catch (error) {
        setError("User already exists, try logging in");
      }
    } else {
      try {
        const res = await axios.post("/api/login", inputs);

        login(res.data);

        setInputs(defaultValues);
        setError("");
      } catch (error) {
        setError("Invalid username or password");
      }
    }
  };

  const handleInput = (inputs) => {
    setError("");
    setInputs(inputs);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w3-theme-d3 w3-container"
      style={{
        padding: "25px",
        borderRadius: "25px",
        width: "80%",
        margin: "20px auto",
      }}
    >
      <h2>{isSigningUp ? "Sign Up Form" : "Log In Form"}</h2>
      <h3 style={{ color: "red" }}>{error && error}</h3>
      <div>
        <label>Username:</label>
        <input
          className="w3-input"
          style={{
            borderRadius: "25px",
            marginBottom: "20px",
          }}
          type="text"
          name="username"
          required
          value={inputs.username}
          onChange={(e) => handleInput({ ...inputs, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          className="w3-input"
          style={{
            borderRadius: "25px",
            marginBottom: "20px",
          }}
          type="password"
          name="password"
          required
          value={inputs.password}
          onChange={(e) => handleInput({ ...inputs, password: e.target.value })}
        />
      </div>
      {isSigningUp && (
        <div>
          <label>User Type:</label>
          <select
            className="w3-input"
            style={{ borderRadius: "25px", marginBottom: "20px" }}
            name="userType"
            required
            value={inputs.userType}
            onChange={(e) =>
              handleInput({ ...inputs, userType: e.target.value })
            }
          >
            <option value="host">Host</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input
          type="submit"
          value="Submit"
          className="w3-theme-d1 w3-btn"
          style={{ borderRadius: "25px", width: "40%" }}
        />
        <input
          type="button"
          className="w3-theme-d1 w3-btn"
          style={{ borderRadius: "25px", width: "40%" }}
          value={isSigningUp ? "Log In Form" : "Sign Up Form"}
          onClick={() => setIsSigningUp(!isSigningUp)}
        />
      </div>
    </form>
  );
};

export default LoginForm;
