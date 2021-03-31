import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
//redux stuff
import { connect } from "react-redux";
import { userLogout } from "../../actions/auth";

function SideBar({ changePopUps, userLogout }) {
  return (
    <Fragment>
      <div
        className="h-screen w-2/12 absolute z-50 top-0 right-0 bg-black bg-opacity-5 blurStuff lg:w-4/12 lg3:w-3/12 md:w-6/12 sm:w-8/12"
        id="sideBar"
      >
        <div className="relative w-full h-full">
          <h3 className="absolute top-170/2 centerHorizontal font-semibold text-2xl text-white hover:text-gray-400">
            <a
              role="button"
              onClick={() => {
                changePopUps("menu");
              }}
              className="border border-black py-2 px-3 rounded-lg bg-black bg-opacity-70 hover:bg-white hover:text-black"
            >
              CLOSE
            </a>
          </h3>
          <div className="w-full h-1/2 centerSom bg-black bg-opacity-90">
            <div className="relative w-full h-full">
              <div className="w-180/2 h-4/5 border-tb border-white centerSom">
                <ul className="w-full h-full divide-y text-white">
                  <a href="#" className="">
                    <li className="w-full h-1/5 text-2xl uppercase font-light relative border-b border-white menu-shadow">
                      <p className="absolute centerSom">Time spend</p>
                    </li>
                  </a>
                  <a href="#" className="">
                    <li className="w-full h-1/5 text-2xl uppercase font-light relative border-b border-white menu-shadow">
                      <p className="absolute centerSom">Calendar</p>
                    </li>
                  </a>
                  <a
                    role="button"
                    className=""
                    onClick={() => {
                      changePopUps("flag");
                    }}
                  >
                    <li className="w-full h-1/5 text-2xl uppercase font-light relative border-b border-white menu-shadow">
                      <p className="absolute centerSom">new flag</p>
                    </li>
                  </a>
                  <a href="#" className="">
                    <li className="w-full h-1/5 text-2xl uppercase font-light relative border-b border-white menu-shadow">
                      <p className="absolute centerSom">profile</p>
                    </li>
                  </a>
                  <a role="button" onClick={userLogout} className="">
                    <li className="w-full h-1/5 text-2xl uppercase font-light relative menu-shadow">
                      <p className="absolute centerSom">log out</p>
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

SideBar.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
};

export default connect(null, { userLogout })(SideBar);
