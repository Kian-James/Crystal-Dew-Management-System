import React from "react";

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
    </div>
  );
};

export default SideNav;
