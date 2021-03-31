import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "../individual/Alert";
//scrollbar stuff
import { Scrollbars } from "react-custom-scrollbars";
//redux stuff
import { connect } from "react-redux";

function DayTodos({ changePopUps, flags, changeBoxDate }) {
  const date = new Date();
  let currentYear = date.getFullYear();
  let counter = 1;
  let controlHeight = "h-4/5";
  let dayBoxesArray = [];
  const monthsNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [monthNumber, setMonthNumber] = useState({
    number: date.getMonth(),
  });
  function modifyMonthNumber(move) {
    if (move === "up") {
      if (monthNumber.number === 11) {
        setMonthNumber({ ["number"]: monthNumber.number });
      } else {
        setMonthNumber({ ["number"]: monthNumber.number + 1 });
      }
    }
    if (move === "down") {
      if (monthNumber.number === 0) {
        setMonthNumber({ ["number"]: monthNumber.number });
      } else {
        setMonthNumber({ ["number"]: monthNumber.number - 1 });
      }
    }
  }
  const monthDays = function (month, year) {
    return new Date(year, month + 1, 0).getDate();
  };
  const [numberDays, setNumberDays] = useState({
    days: monthDays(monthNumber.number, currentYear),
  });
  function changeDays() {
    if (monthDays(monthNumber.number, currentYear) < 31) {
      controlHeight = "h-4/5";
    } else {
      controlHeight = "h-full";
    }
    dayBoxesArray = [];
    while (counter <= monthDays(monthNumber.number, currentYear)) {
      dayBoxesArray.push(
        <a
          role="button"
          id={counter}
          className={`button-shadow w-10/12 mx-auto rounded-box ${controlHeight}`}
          onClick={(e) => {
            const newDate = {
              day: e.currentTarget.id,
              month: monthsNames[monthNumber.number],
            };
            changeBoxDate(newDate);
            changePopUps("todo");
          }}
        >
          <div
            className={`border-3 border-black col-span-1 iosProblem w-full h-full rounded-box relative overflow-hidden  mx-auto min-h-32`}
          >
            <h2 className="number text-6xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {counter}
            </h2>
            <div className="w-1/3 h-24/2 bg-red-500 absolute bottom-0 iosProblem overflow-hidden"></div>
          </div>
        </a>
      );
      counter++;
    }
    counter = 1;
  }
  changeDays();
  const [dayBoxes, setDayBoxes] = useState(dayBoxesArray);

  useEffect(() => {
    changeDays();
    setDayBoxes(dayBoxesArray);
  }, [monthNumber.number]);
  return (
    <Fragment>
      {/* <!-- Start of main div --> */}
      <main className="main-div w-full h-132/2">
        <div className="main-div w-full h-full border-b border-black px-20 overflow-auto pt-5 lg:px-10 md:px-5">
          <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            renderTrackVertical={(props) => (
              <div {...props} className="track-vertical" />
            )}
            renderThumbVertical={(props) => (
              <div {...props} className="thumb-vertical" />
            )}
            renderView={(props) => <div {...props} className="view" />}
          >
            <div className="select-month pb-2 pl-2">
              <span>
                <a
                  role="button"
                  className=""
                  onClick={() => {
                    modifyMonthNumber("down");
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/left.png"
                    className="inline pb-4 mr-3"
                  />
                </a>
              </span>
              <span>
                <a
                  role="button"
                  className=""
                  onClick={() => {
                    modifyMonthNumber("up");
                  }}
                >
                  <img
                    src="https://img.icons8.com/ios/50/000000/right.png"
                    className="inline pb-4 pr-4"
                  />
                </a>
              </span>
              <h3 className="inline text-3xl pt-20 uppercase tracking-normal font-light">
                {monthsNames[monthNumber.number]}
              </h3>
            </div>
            {/* <!-- Start of the grid layout --> */}
            <div className="grid-div w-full h-full grid grid-cols-10 gap-x-10 gap-y-4 lg:grid-cols-9 lg:gap-x-0 lg2:gap-x-5 lg1:gap-x-0 lg3:gap-x-5 md3:grid-cols-8 md3:gap-x-0 md2:grid-cols-7 md:grid-cols-5 sm2:grid-cols-4 sm:grid-cols-3 sm:gap-x-0">
              {/* <!-- firts 10  --> */}
              {dayBoxes}
              {/* <a href="#todos">
              <div className="border-3 border-black col-span-1 iosProblem w-10/12 h-full rounded-box relative overflow-hidden button-shadow mx-auto min-h-32">
                <h2 className="number text-6xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  1
                </h2>
                <div className="w-1/3 h-24/2 bg-red-500 absolute bottom-0 iosProblem overflow-hidden"></div>
              </div>
            </a> */}
              {/* <!-- final of boxes --> */}
            </div>
          </Scrollbars>
        </div>
      </main>
    </Fragment>
  );
}

DayTodos.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  flags: PropTypes.object.isRequired,
  changeBoxDate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  flags: state.flag,
});

export default connect(mapStateToProps)(DayTodos);
