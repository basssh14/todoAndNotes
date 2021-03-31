import React, { useState } from "react";
import PropTypes from "prop-types";
import { createNote } from "../../actions/notes";

//redux stuff
import { connect } from "react-redux";

function NewNote({ changePopUps, flags, createNote }) {
  const [newNote, setNewNote] = useState({
    text: "",
    flag: "",
  });
  function changeNewNote(e) {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  }
  function submitNote(e) {
    e.preventDefault();
    const data = {
      text: newNote.text,
    };
    createNote(data, newNote.flag);
    changePopUps("newNote");
  }
  return (
    <div
      className="newNote h-full w-full absolute top-0 left-0 bg-black bg-opacity-10"
      id="newNote"
    >
      <div className="relative w-full h-full">
        <form className="w-full h-full" onSubmit={(e) => submitNote(e)}>
          <div className="w-70/2 h-1/2 centerSom bg-white border-2 border-black rounded-lg py-8 px-8 lg:w-1/2 md:w-3/4 sm:w-full newNotePop">
            <div className="relative w-full h-full">
              <h3 className="absolute -top-8 -right-5 font-semibold text-2xl hover:text-gray-400">
                <a
                  role="button"
                  className=""
                  onClick={() => changePopUps("newNote")}
                >
                  x
                </a>
              </h3>
              <div className="w-full h-full grid grid-rows-6 gap-3">
                <div className="w-full row-span-4 pb-2">
                  <textarea
                    name="text"
                    cols="20"
                    rows="10"
                    value={newNote.text}
                    onChange={changeNewNote}
                    className="w-full h-full border-2 border-black rounded-xl"
                    placeholder="Write your note here..."
                  ></textarea>
                </div>
                <div className="w-full row-span-1 relative">
                  <select
                    name="flag"
                    value={newNote.flag}
                    onChange={changeNewNote}
                    className="w-1/3 rounded-xl border border-black centerSom"
                  >
                    <option value="default">Note Flag</option>
                    {flags
                      .filter((flag) => flag.tipo === "Note")
                      .map((flag) => (
                        <option value={flag._id} key={flag._id}>
                          {flag.title}
                        </option>
                      ))}
                    {/* <option value="Important">Important</option>
                  <option value="play">Play</option>
                  <option value="Chill">Chill</option> */}
                  </select>
                </div>
                <div className="w-full row-span-1 relative">
                  <button
                    type="submit"
                    className="w-1/3 py-2 border border-black rounded-xl centerSom hover:bg-black hover:text-white"
                  >
                    Create Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

NewNote.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  flags: state.flag.flags.flags,
});

export default connect(mapStateToProps, { createNote })(NewNote);
