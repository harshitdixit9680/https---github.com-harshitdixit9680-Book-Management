import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className=" container-fluid nav_bg">
        <div className="row">
          <div className=" mx-auto">
            {/* <nav className="navbar  navbar-dark " > */}
            <nav className=" navbar navbar-dark bg-dark" >

              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  Book Management System
                </Link>
                {/* <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" ></span>
                </button> */}
                <div
                //   className="collapse navbar-collapse"
                //   id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link"
                        to="/Bookmgmt"

                      >
                        Book
                      </Link>{" "}
                    </li>
                    
                    
                  </ul>
               
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
