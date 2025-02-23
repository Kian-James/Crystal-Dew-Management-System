import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDatabaseFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const SideNav = () => {
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="brand-container">
        <img
          src={"../components/Images/PBSI-LOGO-1.png"}
          alt="school-logo"
          className="school-logo"
        />
        <div>
          <p className="brand-name">PBSI </p>
          <p className="brand-slogan">Manage your School in Easy Way</p>
        </div>
      </div>
      <div className="menu-container">
        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <RiDatabaseFill /> Overview
        </Link>
        <Link
          to="/dashboard/courses"
          className={
            location.pathname === "/dashboard/courses"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaBook /> All Courses
        </Link>
        <Link
          to="/dashboard/add-courses"
          className={
            location.pathname === "/dashboard/add-courses"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaPlus /> Add Course
        </Link>
        <Link
          to="/dashboard/students"
          className={
            location.pathname === "/dashboard/students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaUserGroup /> All Students
        </Link>
        <Link
          to="/dashboard/add-students"
          className={
            location.pathname === "/dashboard/add-students"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaPlus /> Add Students
        </Link>
        <Link
          to="/dashboard/collect-fee"
          className={
            location.pathname === "/collect-fee"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaMoneyBillWave /> Collect Fee
        </Link>
        <Link
          to="/dashboard/payment-history"
          className={
            location.pathname === "/dashboard/payment-history"
              ? "menu-active-link"
              : "menu-link"
          }
        >
          <FaList /> Payment History
        </Link>
      </div>
      <div className="contact-us">
        <p>
          <FaAddressCard /> Contact Developer
        </p>
        <p>For any issue or feature request</p>
        <p>
          <FaPhoneAlt /> 0949-417-7230
        </p>
      </div>
    </div>
  );
};

export default SideNav;
