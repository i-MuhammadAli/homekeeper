import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./header/Header2";

function Testing() {
  return (
    <>
      <Header />
      <section className="account_setting ">
        <div className="container">
          <div className="my_properties notif">
            <h2>My Notifications</h2>

            <ul>
              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>
              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>

              <li>
                <span>
                  <i className="fa-regular fa-bell"></i>
                </span>{" "}
                Invitation Request to Create Property
                <label>Invitation Request to </label>
                <a href="#" className="View">
                  View
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testing;
