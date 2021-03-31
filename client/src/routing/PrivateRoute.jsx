import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Components/layout/Spinner";

function PrivateRoute({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={
        (props) =>
          loading ? (
            <Spinner />
          ) : isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        // !isAuthenticated && !loading ? (
        //   <Redirect to="/" />
        // ) : (
        //   <Component {...props} />
        // )
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
