import React from "react";
import PropTypes from "prop-types";
//redux stuff
import { connect } from "react-redux";

function Alert({ alerts }) {
  console.log("load component");
  if (alerts !== null && alerts.length > 0) {
    console.log("this is an alert ");
    return (
      <div className="alertsMaster w-2/5 absolute centerHorizontal lg:w-3/5 sm2:w-4/5 sm:w-full">
        <div className="relative">
          {alerts.map((alert) => (
            <div
              className={`alert w-full h-10 ${alert.alertType} relative text-white rounded-lg mt-4 text-lg text-center py-auto`}
            >
              <p className="absolute centerSom">{alert.msg}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
