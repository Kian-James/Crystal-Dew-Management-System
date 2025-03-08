import React from "react";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import vd1 from "../components/Videos/backgroundVid.mp4";
import "./Home.css";

const Home = () => {
  return (
    <Layout title={"Home"}>
    <div className="vid-container">
      <video className="bg-video" src={vd1} autoPlay muted loop>
      </video>
      <div className="vid-overlay position-absolute top-50 end-0 translate-middle-y d-flex flex-column p-0 m-0">
        <div className="content">
          <section className="home text-white d-flex align-items-center min-vh-100">
            <div className="container text-center">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <h2 className="display-4 fw-bold text-uppercase mt-4">
                    <em>Pure, Fresh, Crystal Clear Hydration You Can Trust!</em>
                  </h2>
                  <p className="lead">At Crystal Dew, we are dedicated to providing the highest quality 
                    drinking water for you and your family. Our advanced purification process ensures 
                    every drop is fresh, clean, and safe. Whether you need refills, doorstep delivery, 
                    or a convenient walk-in station, we are committed to keeping you hydrated with pure 
                    and refreshing water. Experience the difference with Crystal Dew—where purity meets 
                    trust.</p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="social-media position-absolute top-50 end-0 translate-middle-y me-3 d-flex flex-column">
              <a href="https://www.facebook.com/crystal.dew.pandan" className="mb-3 text-white fs-3">
                <FaFacebook />
              </a>
              <a href="https:/m.me/crystal.dew.pandan" className="text-white fs-3">
                <FaFacebookMessenger />
              </a>
            </div>
          </section>


        </div>
      </div>
    </div>

    </Layout>
  );
};

export default Home;