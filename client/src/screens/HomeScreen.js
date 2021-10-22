import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <div>
      <div className="container mt-5 shadow-lg p-3 mb-5 bg-body rounded">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://wallpapercave.com/wp/wp2789220.jpg"
              style={{ width: "100%", height: "50vh" }}
              alt=""
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-info text-center mt-3 mb-3">
              Online Consultation
            </h1>
            <h5 className="text-success text-center mb-5">
              We value your life!
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel
              risus commodo viverra maecenas accumsan lacus vel facilisis. Dolor
              sit amet consectetur adipiscing. Et tortor at risus viverra
              adipiscing at. Dapibus ultrices in iaculis nunc sed augue lacus
              viverra. Elementum eu facilisis sed odio morbi quis. Ut tortor
              pretium viverra suspendisse. Sagittis id consectetur purus ut
              faucibus. Pellentesque habitant morbi tristique senectus et.
              Tortor posuere ac ut consequat semper viverra. Hendrerit gravida
              rutrum quisque non.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
              <img
                src="https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg"
                alt="admin"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Admin</h5>
                <Link to="/adminlogin" className="btn btn-primary btn-block">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
              <img
                src="https://visualpharm.com/assets/364/Doctor%20Male-595b40b65ba036ed117d3f68.svg"
                alt="doctor"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Doctor</h5>
                <Link to="/doctorlogin" className="btn btn-primary btn-block">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-lg p-3 mb-5 bg-body rounded">
              <img
                src="https://visualpharm.com/assets/380/Guest%20Male-595b40b65ba036ed117d41bb.svg"
                alt="patient"
              />
              <div className="card-body">
                <h5 className="card-title text-center">Patient</h5>
                <Link to="/patientlogin" className="btn btn-primary btn-block">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
