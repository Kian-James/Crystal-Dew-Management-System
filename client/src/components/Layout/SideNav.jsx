import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="nav-container">
      <div className="brand-container">
        <img
          src={"../components/Images/PBSI-LOGO.png"}
          alt="school-logo"
          className="school-logo"
        />
        <div>
          <p className="brand-name">PBSI </p>
          <p className="brand-slogan">Manage your School in Easy Way</p>
        </div>
      </div>
      <div className="menu-container">
        <Link className="menu-link">Home</Link>
        <Link className="menu-link">All Course</Link>
        <Link className="menu-link">Add Course</Link>
        <Link className="menu-link">Add Students</Link>
        <Link className="menu-link">All Students</Link>
        <Link className="menu-link">Collect Fee</Link>
        <Link className="menu-link">Payment History</Link>
      </div>
    </div>
  );
};

export default SideNav;
