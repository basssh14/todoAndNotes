import React, { useState } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";
//redux stuff
import { updateNote } from "../../actions/notes";
import { connect } from "react-redux";

function EditNote({ changePopUps, notes, updateNote, noteIdForUpdate, flags }) {
  const note =
    notes.notes !== null &&
    notes.notes.notes.find((note) => note._id === noteIdForUpdate);
  const [newNote, setNewNote] = useState({
    text: notes.notes !== null ? note.text : "",
    flag: notes.notes !== null ? note.flag : "",
  });
  function changeNote(e) {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  }
  function submitNewNote(e) {
    e.preventDefault();
    const noteData = {
      text: newNote.text,
    };
    updateNote(noteData, noteIdForUpdate, newNote.flag);
    changePopUps("editNote");
  }
  return (
    <div
      className="newNote h-full w-full absolute top-0 left-0 bg-black bg-opacity-10"
      id="editNote"
    >
      <div className="relative w-full h-full">
        <form
          className="w-full h-full"
          onSubmit={(e) => {
            submitNewNote(e);
          }}
        >
          <div className="w-70/2 h-1/2 centerSom bg-white border-2 border-black rounded-lg py-8 px-8 lg:w-1/2 md:w-3/4 md:h-2/3 sm:w-full editNotePop">
            <div className="relative w-full h-full">
              <h3 className="absolute -top-8 -right-5 font-semibold text-2xl hover:text-gray-400">
                <a
                  role="button"
                  className=""
                  onClick={() => {
                    changePopUps("editNote");
                  }}
                >
                  x
                </a>
              </h3>
              <div className="w-full h-full grid grid-rows-6 gap-3">
                <div className="w-full row-span-4 pb-2">
                  <textarea
                    name="text"
                    id="editNote"
                    cols="20"
                    value={newNote.text}
                    onChange={(e) => {
                      changeNote(e);
                    }}
                    rows="10"
                    className="w-full h-full border-2 border-black rounded-xl"
                  >
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
                      renderView={(props) => (
                        <div {...props} className="view" />
                      )}
                    >
                      {newNote.text}
                    </Scrollbars>
                  </textarea>
                </div>
                <div className="w-full row-span-1 relative">
                  <select
                    name="flag"
                    value={newNote.flag}
                    onChange={(e) => {
                      changeNote(e);
                    }}
                    id="noteFlag"
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
                    {/* <option value="Important">
                    Important
                  </option>
                  <option value="play">Play</option>
                  <option value="Chill">Chill</option> */}
                  </select>
                </div>
                <div className="w-full row-span-1 relative">
                  <button className="w-1/3 py-2 border border-black rounded-xl centerSom hover:bg-black hover:text-white">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    // <div>
    //   {console.log(noteIdForUpdate)}
    //   {/* {notes.notes !== null &&
    //     notes.notes.notes
    //       .find((note) => note._id === noteIdForUpdate)
    //       // .map((note) => (
    //       //   <div
    //       //     className="newNote h-full w-full absolute top-0 left-0 bg-black bg-opacity-10"
    //       //     id="editNote"
    //       //   >
    //       //     <div className="relative w-full h-full">
    //       //       <div className="w-70/2 h-1/2 centerSom bg-white border-2 border-black rounded-lg py-8 px-8 lg:w-1/2 md:w-3/4 md:h-2/3 sm:w-full editNotePop">
    //       //         <div className="relative w-full h-full">
    //       //           <h3 className="absolute -top-8 -right-5 font-semibold text-2xl hover:text-gray-400">
    //       //             <a
    //       //               role="button"
    //       //               className=""
    //       //               onClick={() => {
    //       //                 changePopUps("editNote");
    //       //               }}
    //       //             >
    //       //               x
    //       //             </a>
    //       //           </h3>
    //       //           <div className="w-full h-full grid grid-rows-6 gap-3">
    //       //             <div className="w-full row-span-4 pb-2">
    //       //               <textarea
    //       //                 name="note"
    //       //                 id="editNote"
    //       //                 cols="20"
    //       //                 rows="10"
    //       //                 value="somethig"
    //       //                 className="w-full h-full border-2 border-black rounded-xl"
    //       //               >
    //       //                 {note.text}{" "}
    //       //               </textarea>
    //       //             </div>
    //       //             <div className="w-full row-span-1 relative">
    //       //               <select
    //       //                 name="noteFlag"
    //       //                 id="noteFlag"
    //       //                 className="w-1/3 rounded-xl border border-black centerSom"
    //       //               >
    //       //                 <option value="default">Note Flag</option>
    //       //                 <option value="Important" selected>
    //       //                   Important
    //       //                 </option>
    //       //                 <option value="play">Play</option>
    //       //                 <option value="Chill">Chill</option>
    //       //               </select>
    //       //             </div>
    //       //             <div className="w-full row-span-1 relative">
    //       //               <button className="w-1/3 py-2 border border-black rounded-xl centerSom hover:bg-black hover:text-white">
    //       //                 Save Note
    //       //               </button>
    //       //             </div>
    //       //           </div>
    //       //         </div>
    //       //       </div>
    //       //     </div>
    //       //   </div>
    //       // ))}
    //   }
    // </div> */}
  );
}

EditNote.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
  noteIdForUpdate: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  notes: state.notes,
  flags: state.flag.flags.flags,
});

export default connect(mapStateToProps, { updateNote })(EditNote);
