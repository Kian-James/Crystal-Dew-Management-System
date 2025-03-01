import React from "react";
import Layout from "../components/Layout/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";

const Home = () => {
  return (
    <Layout title={"Home"}>
      <div className="container text-center mt-5">
        <div className="jumbotron bg-primary text-white">
          <h1 className="display-4">Welcome to Crystal Dew Water Station</h1>
          <p className="lead">Providing clean and fresh water for everyone.</p>
          <button className="btn btn-warning btn-lg">Learn More</button>
        </div>
        <div className="mt-5">
          <h2>Our Services</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Water Delivery</h3>
                  <p className="card-text">Fast and reliable water delivery service to your doorstep.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Water Purification</h3>
                  <p className="card-text">State-of-the-art water purification systems for clean water.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Customer Support</h3>
                  <p className="card-text">24/7 customer support to assist you with your needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;