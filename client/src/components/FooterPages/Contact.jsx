import React from "react";
import Layout from "../Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import vd3 from "../Videos/backgroundVid3.mp4";
import "./Contact.css";

const Contact = () => {
  return (
    <Layout title={"Contact"}>
      <div className="vid-container">
        <video className="bg-video" src={vd3} autoPlay muted loop></video>
        <div className="vid-overlay2"></div>
        <div className="contact-content">
          <div className="row contact justify-content-center align-items-center min-vh-100">
            <div className="col-md-6"></div>
            <div className="col-md-4 card-container">
              <h1 className="bg-dark p-2 text-center">Contact Us</h1>
              <p className="text-justify mt-2">
                Any Query and Info About Product Feel Free to Call Anytime
              </p>
              <p className="mt-3">
                <BiMailSend /> Email: crystaldewpuriwater@gmail.com
              </p>
              <p className="mt-3">
                <BiPhoneCall /> +63-999-183-2875
              </p>
              <p className="mt-3">
                <BiSupport /> 1800-0000-0000
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;