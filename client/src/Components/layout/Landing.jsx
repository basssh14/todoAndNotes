import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

function Landing({ isAuthenticated, loading }) {
  if (isAuthenticated) {
    return <Redirect to="/LoginSuccess" />;
  }
  return (
    <Fragment>
      {/* <!-- Master div --> */}
      <div className="register block w-full h-full prueba relative place-content-center">
        {/* <!-- background image --> */}
        <img
          src="./img/max-bender-s4I1xpX_ny8-unsplash.jpg"
          alt="Bg"
          className="w-full h-full backgroundImage"
        />
        {/* <!-- box div --> */}
        <div className="container content-center w-3/5 h-2/3 md:w-full md:my-auto md:h-full md2:w-11/12 md2:h-3/5 lg:w-10/12 lg:h-3/5 lg2:w-3/4 lg2:h-3/5 xl:h-3/5 xl2:h-3/5 max-box absolute bg-gray-300 boxSize bg-opacity-5 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 blurStuff">
          {/* <!-- color right square --> */}
          <div className="container w-1/2 h-full md:w-full bg-gradient-to-tl from-yellow-200 via-red-300 to-blue-400 opacity-75 float-right"></div>
          {/* <!-- logo image --> */}
          <img
            src="./img/timecher.svg"
            alt="Product logo"
            className="absolute w-2/3 left-1/2 transform translate-x-1/23 my-14 lg2:mb-0 md:w-11/12 md:transform md:-translate-x-1/2 md:mt-32"
          />
          {/* <!-- box for the text --> */}
          <div className="container w-full h-2/3 absolute md:h-auto top-48 mt-6 md:top-64 lg2:mt-0 xl:top-48">
            {/* <!-- left text stuff --> */}
            <div className="container w-1/2 h-full float-left px-20 md:hidden md:invisible">
              <h2 className="text-xl text-left font-normal tracking-widest uppercase text-red-300">
                achive your goals
              </h2>
              <h2 className="font-bold text-left text-4xl text-blue-100 mt-1">
                Time is enough when you manage it correctly.
              </h2>
              <button className="bg-black text-red-100 px-20 py-4 text-lg uppercase font-semibold mt-8 rounded-full button-shadow outline-button">
                Learn More
              </button>
            </div>
            {/* <!-- right text stuff --> */}
            <div className="container text-center w-1/2 h-full float-right md:float-none md:w-full md:mx-auto">
              <h2 className="text-black text-md font-semibold text-medium uppercase -mt-2">
                Start Managing Your Time Now
              </h2>
              
              {/* <form action="https://glacial-taiga-46309.herokuapp.com/api/auth/google"> */}
                <form action="http://localhost:5000/api/auth/google">
              
                <button
                  type="submit"
                  className="bg-black text-white w-1/2 mx-2 h-14 pt-1 uppercase mt-8 text-xl font-semibold rounded-full button-shadow outline-button"
                >
                  <img
                    src="https://img.icons8.com/fluent/48/000000/google-logo.png"
                    className="inline w-8 mb-1"
                    alt="googleLogo"
                  />
                  Google
                </button>
                <button className="button-t2 w-1/2" type="submit">
                  <img
                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                    className="inline w-8 mb-1"
                    alt="facebook logo"
                  />
                  Facebook
                </button>
              </form>
              <hr className="w-5/6 mt-10 mx-auto border-black" />
              <p className="text-center w-5/6 mx-auto text-rsmall">
                By clicking on register you accept the terms and contions of the
                site, for more information about this please refere to the{" "}
                <a href="#" className="underline">
                  terms and contions
                </a>{" "}
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    //);
  );
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Landing);
