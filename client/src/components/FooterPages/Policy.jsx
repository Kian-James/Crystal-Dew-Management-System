import React from "react";
import Layout from "../Layout/Layout";
import "./Policy.css";
import vd5 from "../Videos/backgroundVid5.mp4";

const Policy = () => {
  return (
    <div>
      <Layout title={"About Us"}>
        <div className="vid-container">
          <video src={vd5} className="bg-video"></video>
          <div className="vid-overlay2">
            <div className="content">
                <div className="row contact ">
                <div className="col-md-6 "></div>
                <div className="policy-content col-md-4">
                  <h2 className="bg-dark p-2 text-white text-center mt-5 justify-content-center">Information We Collect</h2>
                  <ul>
                    <li>Personal Information: Name, contact number, email address, 
                      and delivery address (for orders and inquiries).</li>
                    <li>Transaction Information: Purchase history, payment details 
                      (excluding credit card numbers), and order preferences.</li>
                    <li>Technical Data: IP address, browser type, and 
                      interaction with our website (if applicable).</li>
                    <li>Security: Your data is stored securely and 
                      accessed only by authorized personnel.</li>
                    <li>Use of Data: Processing orders and deliveries.</li>
                  </ul>
                </div>
            </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policy;
