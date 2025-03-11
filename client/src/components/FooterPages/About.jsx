import React from "react";
import { FaBuildingUser } from "react-icons/fa6";
import { IoWater } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import Layout from "../Layout/Layout";
import vd2 from "../Videos/backgroundVid2.mp4";
import "./About.css";

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="about-page">
        <div className="vid-container">
          <video className="bg-video" src={vd2} autoPlay muted loop></video>
          <div className="vid-overlay2 position-absolute top-50 end-0 translate-middle-y d-flex flex-column p-0 m-0">
            <div className="content"></div>
            <div className="container d-flex flex-column-reverse flex-md-row justify-content-center align-items-center min-vh-100">
              <div className="col-md-6 mx-2">
                <div className="card shadow-lg">
                  <h2 className="title fw-bold">Our Service Section</h2>
                  <ul className="service-list">
                    <li>
                      <IoWater className="icon" />
                      <p className="service-content d-inline">
                        <em>
                          <strong>Refilling Services: </strong>
                        </em>
                        Bring your own container, or use ours.
                      </p>
                    </li>
                    <li>
                      <TbTruckDelivery className="icon" />
                      <p className="service-content d-inline">
                        <em>
                          <strong>Delivery Services: </strong>
                        </em>
                        Fast and convenient water delivery to your doorstep.
                      </p>
                    </li>
                    <li>
                      <FaBuildingUser className="icon" />
                      <p className="service-content d-inline">
                        <em>
                          <strong>Walk-in Station: </strong>
                        </em>
                        Visit us anytime for fresh and clean water.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mx-2 mb-3 mb-md-0 mt-5">
                <div
                  className="card shadow-lg"
                >
                  <h2 className="title fw-bold">About Us</h2>
                  <p className="text-justify mt-2">
                    We opened during the pandemic and we started providing clean
                    and safe water to our community. Slowly, we were able to
                    help small businesses have their quality water as well. We
                    gained our customer&apos;s trust and loyalty. We are
                    grateful for everyone who has supported us, we&apos;ll
                    continue to provide the best quality water.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
