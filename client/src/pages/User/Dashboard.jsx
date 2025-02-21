import React from "react";
import SideNav from "../../components/Layout/SideNav";
import Layout from "../../components/Layout/Layout";

const Dashboard = () => {
  return (
    <Layout title={"Dashboard"}>
      <div className="dashboard-main-container">
        <div className="dashboard-container">
          <SideNav />
          <div className="main-container">
            <div className="top-bar">
              <div className="logo-container">
                <img
                  alt="school-logo"
                  className="school-logo"
                  src={"../components/Images/PBSI-LOGO.png"}
                />
              </div>
              <div className="profile-container">
                <h2 className="profile-name">PBSI</h2>
                <button className="logout-btn">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
