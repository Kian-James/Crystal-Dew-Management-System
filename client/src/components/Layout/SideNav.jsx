import React from "react";
import { useAuth } from "../../context/auth";
import { Link, useLocation } from "react-router-dom";
import { RiDatabaseFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

const SideNav = () => {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  return (
    <div className="nav-container">
      <div className="brand-container">
        <img
          src={"../components/Images/PBSI-LOGO-1.png"}
          alt="Business logo"
          className="brand-logo"
        />
        <div>
          <p className="brand-name">
            Crystal Dew
            <br />
            Water Station
          </p>
          <p className="brand-slogan">Water for Everyone</p>
        </div>
      </div>
      <div className="menu-container">
        {auth.user.role === 1 ? (
          <>
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
              to="/dashboard/add-expense"
              className={
                location.pathname === "/dashboard/add-expense"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaPlus /> Add Expense
            </Link>
            <Link
              to="/dashboard/expense-list"
              className={
                location.pathname === "/dashboard/expense-list"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaBook /> Expense List
            </Link>
            <Link
              to="/dashboard/add-product"
              className={
                location.pathname === "/dashboard/add-product"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaPlus /> Add Product
            </Link>
            <Link
              to="/dashboard/product-list"
              className={
                location.pathname === "/dashboard/product-list"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaBook /> Product List
            </Link>
            <Link
              to="/dashboard/add-employee"
              className={
                location.pathname === "/dashboard/add-employee"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaPlus /> Add Employee
            </Link>
            <Link
              to="/dashboard/employee-list"
              className={
                location.pathname === "/dashboard/employee-list"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaUserGroup /> Employee List
            </Link>
            <Link
              to="/dashboard/account-list"
              className={
                location.pathname === "/dashboard/account-list"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaUserGroup /> Account List
            </Link>
            <Link
              to="/dashboard/transaction-history"
              className={
                location.pathname === "/dashboard/transaction-history"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaList /> Transaction History
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/employee-dashboard"
              className={
                location.pathname === "/employee-dashboard"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaPlus /> Create Transaction
            </Link>
            <Link
              to="/employee-dashboard/pending-transaction"
              className={
                location.pathname === "/employee-dashboard/pending-transaction"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaBook /> Pending Transaction
            </Link>
            <Link
              to="/employee-dashboard/completed-transaction"
              className={
                location.pathname ===
                "/employee-dashboard/completed-transaction"
                  ? "menu-active-link"
                  : "menu-link"
              }
            >
              <FaList /> Completed Transaction
            </Link>
          </>
        )}
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
