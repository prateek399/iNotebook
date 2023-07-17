import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [credential, setcredential] = useState({ email: "", password: "" });
  const host = "http://localhost:5000";
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history.push("/");
      props.showAlert("Successfully logged in", "success");
    } else {
      // show alert
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    e.preventDefault();
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credential.email}
            onChange={onChange}
          />
        </div>
        <div className="my-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credential.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
