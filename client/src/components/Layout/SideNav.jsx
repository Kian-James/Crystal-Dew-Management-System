import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaList } from "react-icons/fa";

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
        <Link className="menu-link">
          <FaHome> </FaHome> Home
        </Link>
        <Link className="menu-link">
          <FaBook> </FaBook> All Course
        </Link>
        <Link className="menu-link">
          <FaPlus> </FaPlus>
          Add Course
        </Link>
        <Link className="menu-link">
          <FaUserGroup> </FaUserGroup>
          All Students
        </Link>
        <Link className="menu-link">
          <FaPlus> </FaPlus>
          Add Students
        </Link>
        <Link className="menu-link">
          <FaMoneyBillWave> </FaMoneyBillWave>
          Collect Fee
        </Link>
        <Link className="menu-link">
          <FaList> </FaList>
          Payment History
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
