import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { newFlag } from "../../actions/flag";

function Flag({ changePopUps, newFlag }) {
  const [flag, setFlag] = useState({
    tipo: "",
    title: "",
    color: "",
  });
  const { tipo, title, color } = flag;
  function changeFlag(event) {
    setFlag({ ...flag, [event.target.name]: event.target.value });
  }
  function onSubmit(e) {
    e.preventDefault();
    newFlag(flag);
    changePopUps("flag");
  }
  return (
    <div
      className="newFlag h-full w-full absolute top-0 left-0 bg-black bg-opacity-10"
      id="newFlag"
    >
      <div className="relative w-full h-full">
        {/* <!-- the white box in the middle --> */}
        <div className="w-1/3 h-1/5 bg-white centerSom rounded-lg border-2 border-black p-2 lg3:w-2/5 lg2:w-90/2 lg:w-1/2 md3:w-3/5 md2:w-140/2 md:w-4/5 md:h-2/5 sm:w-full sm:h-1/3 flagPop">
          {/* <!-- creates the grid --> */}
          <form onSubmit={(e) => onSubmit(e)} className="w-full h-full">
            <div className="w-full h-full grid grid-rows-10">
              {/* <!-- first row --> */}
              <div className="title w-full row-span-3 relative">
                <h3 className="absolute -top-3 right-1 font-semibold text-2xl hover:text-gray-400">
                  <a
                    role="button"
                    className=""
                    onClick={() => {
                      changePopUps("flag");
                    }}
                  >
                    x
                  </a>
                </h3>
                <div className="inside w-1/2 h-full centerSom">
                  <div className="relative w-full h-full">
                    <div className="w-4/5 h-full absolute left-0">
                      <div className="relative w-full h-full">
                        <div className="text-2xl w-full absolute centerVertical">
                          <p className="text-2xl text-center uppercase font-light">
                            Create a new Flag
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/5 h-full absolute left-4/5">
                      <div className="relative h-full w-full">
                        <div className="absolute centerVertical">
                          <img
                            src="https://img.icons8.com/android/24/000000/filled-flag.png"
                            className=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- second row --> */}
              <div className="newFlag w-full row-span-4">
                <div className="relative w-full h-full">
                  <div className="w-full h-full centerSom border-t">
                    <input
                      type="text"
                      name="title"
                      id="flagName"
                      value={title}
                      onChange={changeFlag}
                      placeholder="Add new flag here..."
                      className="absolute centerVertical w-3/5 h-2/3 rounded-lg left-2"
                    />
                    <select
                      name="tipo"
                      value={tipo}
                      onChange={changeFlag}
                      id="todoTag"
                      className="absolute centerVertical w-special h-2/3 rounded-lg left-3/5 ml-7"
                    >
                      <option value="tag" selected>
                        Todo Tag
                      </option>
                      <option value="Note">Note</option>
                      <option value="Todo">Todo</option>
                      <option value="TimeS">Time</option>
                    </select>
                    <input
                      type="color"
                      name="color"
                      value={color}
                      onChange={changeFlag}
                      id="colorPallete"
                      className="absolute centerVertical w-1/12 h-1/2 right-2"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- third row --> */}
              <div className="add w-full row-span-3">
                <div className="relative w-full h-full">
                  <div className="w-2/12 centerSom md:w-4/12">
                    <button
                      type="submit"
                      className="w-full bg-white text-xl border border-black rounded-xl hover:bg-black hover:text-white uppercase"
                    >
                      Add Flag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Flag.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  newFlag: PropTypes.func.isRequired,
};

export default connect(null, { newFlag })(Flag);
