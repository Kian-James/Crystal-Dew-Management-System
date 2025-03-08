import React from "react";
import { FaBuildingUser } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import Layout from "../Layout/Layout";
import "./About.css";

const About = () => {
  return (
    <div>
      <Layout title={"About Us"}>
      <div className="about-page">
          <div className="about-overlay"></div>
          <div className="row contact ">
              <div className="col-md-6 ">
              <div className="card shadow-lg">
                <h2 className = "title fw-bold" >Our Service Section</h2>
                <ul className="service-list">
                  <li>
                    <IoWater className="icon" />
                    <p className="service-content d-inline">
                      <em><strong>Refilling Services: </strong></em>
                      Bring your own container, or use ours.
                    </p>
                  </li>
                  <li>
                    <TbTruckDelivery className="icon" />
                    <p className="service-content d-inline">
                      <em><strong>Delivery Services: </strong></em>
                      Fast and convenient water delivery to your doorstep.
                    </p>
                  </li>
                  <li>
                    <FaBuildingUser className="icon" />
                    <p className="service-content d-inline">
                      <em><strong>Walk-in Station: </strong></em>
                      Visit us anytime for fresh and clean water.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
            <div className="card shadow-lg" style={{ width: "100%", height: "335px" }}>
            <h2 className="title fw-bold">About Us</h2>
              <p className="text-justify mt-2">
                  At Crystal Dew, we prioritize quality and purity. Our advanced filtration 
                  system ensures every drop meets the highest standards of safety and taste. 
                  From homes to businesses, we are committed to keeping our community hydrated 
                  with clean and refreshing drinking water.
              </p>
            </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
