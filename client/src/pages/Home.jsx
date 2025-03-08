import React from "react";
import { FaFacebook, FaFacebookMessenger } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import "./Home.css";

// import vd1 from "../../components/Videos/1-w-bg.mp4"

const Home = () => {
  return (
    <Layout title={"Home"}>
{/* 
    Let's see lang what if
    <video className="bg-video" src={vd1} autoPlay muted loop>
      
    </video> */}

      <section className="home text-white d-flex align-items-center min-vh-100"style={{ backgroundColor: "var(--darkest-color)" }}>
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="display-4 fw-bold text-uppercase mt-4">
                <em>Pure, Fresh, Crystal Clear Hydration You Can Trust!</em>
              </h2>
              <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                laborum.</p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="position-absolute top-50 end-0 translate-middle-y me-3 d-flex flex-column">
          <a href="https://www.facebook.com/crystal.dew.pandan" className="mb-3 text-white fs-3">
            <FaFacebook />
          </a>
          <a href="https:/m.me/crystal.dew.pandan" className="text-white fs-3">
            <FaFacebookMessenger />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
