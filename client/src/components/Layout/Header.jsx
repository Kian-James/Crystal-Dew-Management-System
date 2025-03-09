import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import logo from "../../components/Images/crystalDew_logo.png";
import { useAuth } from "../../context/auth";
import { useState } from "react";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={showSidebar}
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${sidebar ? "show" : ""}`} id="navbarTogglerDemo01">
            <img src={logo} alt="brand-logo" className="brand-logo m-lg-0 m-3" />
            <Link to="/" className="navbar-brand">
              Crystal Dew Water Station
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      to={
                        auth.user.role === 1
                          ? "/dashboard"
                          : "/employee-dashboard"
                      }
                      className="nav-link"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  {/* <span className="navbar-text">{auth.user.name}!</span> */}
                  <li className="nav-item">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link"
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
