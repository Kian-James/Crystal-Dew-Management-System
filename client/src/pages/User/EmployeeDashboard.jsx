import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/Layout/SideNav";
import Layout from "../../components/Layout/Layout";

const EmployeeDashboard = () => {
  return (
    <Layout title={"Employee-Dashboard"}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          <SideNav />
          <div className="main-container">
            <div className="outlet-area">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
