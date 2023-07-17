import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credential, setcredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const host = "http://localhost:5000";
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      props.showAlert("User is already logged in", "danger");
      history.push("/");
      return;
    }
    if (credential.password !== credential.cpassword) {
      //show alert
      props.showAlert("Passwords do not match", "danger");
      history.push("/signup");
      setcredential({ name: "", email: "", password: "", cpassword: "" });
      return;
    }
    const url = `${host}/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      //show alert
      props.showAlert("Successfully created an account", "success");
      history.push("/");
    } else {
      props.showAlert(json.error[0].msg, "danger");
      if (json.error[0].msg === "Sorry this user already exists")
        history.push("/login");
      else history.push("/signup");
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credential.name}
            onChange={onChange}
          />
        </div>
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
        <div className="my-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            name="cpassword"
            value={credential.cpassword}
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

export default Signup;
