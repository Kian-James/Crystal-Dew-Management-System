import React from "react";
import Layout from "../Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact"}>
      <div className="row contact">
        <div className="col-md-6">
          <img src="" alt="contact" style={{ width: "100%" }}></img>
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
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
    </Layout>
  );
};

export default Contact;
