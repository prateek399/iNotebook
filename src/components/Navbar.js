import React, { useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
const Navbar = (props) => {
  const location = useLocation();
  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    props.showAlert("Logged out successfully", "success");
    history.push("/login");
  };
  useEffect(() => {}, [location]);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link className="btn btn-primary btn-sm mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary btn-sm mx-1" to="/signup">
                  Signup
                </Link>
              </form>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
