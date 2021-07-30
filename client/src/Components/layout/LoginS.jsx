import React, { Fragment, useState, useEffect } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import PropTypes from "prop-types";
import SideBar from "../individual/SideBar";
import Spinner from "./Spinner";
import DayTodos from "./DayTodos";
import Todos from "./Todos";
import Flag from "./Flag";
import EditNote from "../individual/EditNote";
import NewNote from "../individual/NewNote";
import { getFlags } from "../../actions/flag";
//import Alert from "../individual/Alert";
import { getTodos } from "../../actions/todos";
import { getNotes, deleteNote } from "../../actions/notes";
//redux stuff
import { connect } from "react-redux";
import Alert from "../individual/Alert";
import { setAlert } from "../../actions/Alert";
import { deleteUser } from "../../actions/auth";

function LoginS({
  auth: { loading, user },
  todos,
  notes,
  getTodos,
  getFlags,
  getNotes,
  deleteNote,
  setAlert,
  deleteUser,
}) {
  const [popUps, setPopUps] = useState({
    menu: false,
    todo: false,
    flag: false,
    newTodo: false,
    editNote: false,
  });
  const [boxDate, setBoxDate] = useState({
    day: null,
    month: null,
  });
  const [noteIdForUpdate, setNoteIdForUpdate] = useState({
    id: "",
  });

  function changeBoxDate(newDate) {
    setBoxDate(newDate);
  }
  function changeNoteId(e) {
    setNoteIdForUpdate({ ...noteIdForUpdate, ["id"]: e.target.id });
  }
  function setTodoTrue() {
    setPopUps({ ...popUps, ["todo"]: true });
  }
  function changePopUps(target) {
    if (target === "menu") {
      setPopUps({ ...popUps, ["menu"]: !popUps.menu });
    }
    if (target === "todo") {
      setPopUps({ ...popUps, ["todo"]: !popUps.todo });
    }
    if (target === "flag") {
      setPopUps({ ...popUps, ["flag"]: !popUps.flag });
    }
    if (target === "newNote") {
      setPopUps({ ...popUps, ["newNote"]: !popUps.newNote });
    }
    if (target === "editNote") {
      setPopUps({ ...popUps, ["editNote"]: !popUps.editNote });
    }
  }
  // function changePopUps2(target) {
  //   if (target === "newNote") {
  //     setPopUps2({ ...popUps2, ["newNote"]: !popUps2.newNote });
  //   }
  // }
  //carousel stuff
  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 268, itemsToShow: 2, pagination: false },
    { width: 618, itemsToShow: 3, pagination: false },
    { width: 834, itemsToShow: 4, pagination: false },
    { width: 1033, itemsToShow: 5, pagination: false },
  ];
  function myArrow({ type, onClick, isEdge }) {
    const pointer =
      type === consts.PREV ? (
        <img
          src="https://img.icons8.com/fluent-systems-regular/48/000000/less-than.png"
          // className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
        />
      ) : (
        <img
          src="https://img.icons8.com/fluent-systems-regular/48/000000/more-than.png"
          //className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
        />
      );
    return (
      <button
        onClick={onClick}
        disabled={isEdge}
        className="outline-none ring-0 focus:outline-none"
      >
        {pointer}
      </button>
    );
  }
  function deleteNotes(e) {
    deleteNote(e.target.id);
  }
  useEffect(() => {
    getTodos();
    getFlags();
    getNotes();
  }, [getTodos, getFlags, getNotes]);
  useEffect(() => {
    if (user.tipo === "demo") {
      setAlert("Your demo period will go for 15 min, enjoy!", "error");
      setTimeout(() => {
        setAlert("Sorry, your demo period is over.", "error");
        deleteUser();
      }, 900000);
    }
  }, []);
  return todos.loading && todos.todos === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="master w-full h-full controlHeight2 m-0 p-0 prueba2">
        <Alert />
        {/* <!-- Start of header --> */}
        <header className="header w-full h-20/2" id="header">
          <div className="header-div w-full h-full bg-black px-24 lg:px-12 md:pl-7 md:pr-3 sm:pl-2 sm:pr-0">
            <div className="header-div-left float-left w-1/4 h-full relative sm2:w-1/3 sm:w-2/5">
              <img
                src="./img/logo.svg"
                alt="Company Logo"
                className="w-5/6 h-full absolute top-1/2 transform -translate-y-1/2 md:w-full"
              />
            </div>
            <div className="header-div-right float-right w-1/2 h-full relative">
              <div className="w-1/3 h-full float-right grid grid-cols-4 lg:w-2/5 md2:w-1/2 lg2:w-70/2 md:w-3/4 sm2:w-full">
                <div className="img col-span-1">
                  <img
                    src={user.profile_photo}
                    alt="User Profile img"
                    className="w-16 h-16 rounded-full absolute top-1/2 transform -translate-y-1/2"
                  />
                </div>
                <div className="text-img relative col-span-2">
                  <h2 className="w-full img-text font-light text-xl text-white absolute centerVertical text-center uppercase lg:text-lg rsm:pl-5 ">
                    Hi, {user.name}
                  </h2>
                </div>
                <div className="list-items relative col-span-1 pl-11">
                  <ul className="header-list-ul text-white text-xl absolute top-1/2 transform -translate-y-1/2">
                    <a
                      role="button"
                      onClick={() => {
                        changePopUps("menu");
                      }}
                    >
                      <li className="header-list-li inline">
                        <img
                          src="https://img.icons8.com/android/24/ffffff/menu.png"
                          className="inline pt-0"
                        />
                      </li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* <!-- Start of main div --> */}
        <DayTodos
          changePopUps={changePopUps}
          changeBoxDate={changeBoxDate}
          setTodoTrue={setTodoTrue}
        />
        {/* <!-- Notes stuff --> */}
        <div className="h-44/2 mx-20 relative lg:mx-10 md:px-0">
          <div className="notes-container w-full h-5/6 absolute top-1/2 transform -translate-y-1/2">
            {/* <div className="leftArrow h-full col-span-1 relative">
            <div className="notes-container w-full h-5/6 absolute top-1/2 transform -translate-y-1/2 grid grid-cols-12 gap-0">
              <img
                src="https://img.icons8.com/fluent-systems-regular/48/000000/less-than.png"
                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
              />
              <div className="w-full h-full grid grid-cols-5 gap-4 lg:grid-cols-4 md2:grid-cols-3 sm2:grid-cols-2 rsm:grid-cols-1">
            </div> */}
            <div className="notesBox h-full w-full">
              <Carousel
                renderArrow={myArrow}
                breakPoints={breakPoints}
                className="w-full h-full"
                showEmptySlots
              >
                <div className="border-2 border-black h-full w-4/5 rounded-sm rounded-br-3xl relative box-shadow">
                  <a
                    role="button"
                    className=""
                    onClick={() => {
                      changePopUps("newNote");
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative ">
                        <img
                          src="https://img.icons8.com/pastel-glyph/64/000000/plus--v1.png"
                          className="m-auto"
                        />
                        <h4 className="uppercase text-lg mt-2">New note</h4>
                      </div>
                    </div>
                  </a>
                </div>
                {notes.notes !== null &&
                  notes.notes.notes.map((note) => (
                    <div
                      key={note._id}
                      className="border-2 w-4/5 border-black h-full rounded-sm rounded-br-3xl relative"
                    >
                      <p className="note-text w-full h-full p-4 font-extralight italic">
                        {note.text.length > 200
                          ? `${note.text.substring(0, 200)}...`
                          : note.text}
                      </p>
                      <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                        <div className="w-full h-full relative">
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <button
                              id={note._id}
                              className="w-full px-12 py-2 mb-4 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow"
                              onClick={(e) => {
                                changeNoteId(e);
                                changePopUps("editNote");
                              }}
                            >
                              edit
                            </button>

                            <button
                              id={note._id}
                              className="w-full px-12 py-2 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow"
                              onClick={(e) => {
                                deleteNotes(e);
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* <div className="border-2 border-black h-full rounded-sm rounded-br-3xl relative lg:hidden">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates dolor excepturi neque deleniti porro accusantium.
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <a href="#editNote" className="">
                          <button className="w-full px-12 py-2 mb-4 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                            edit
                          </button>
                        </a>
                        <button className="w-full px-12 py-2 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black h-full rounded-sm rounded-br-3xl relative rsm:hidden">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    We need to make sure everything is good to go on the dome
                    stuff cause big day is on saturdar and its just 3 day
                    away!!!
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <a href="#editNote" className="">
                          <button className="w-full px-12 py-2 mb-4 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                            edit
                          </button>
                        </a>
                        <button className="w-full px-12 py-2 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black h-full rounded-sm rounded-br-3xl relative md2:hidden">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    Check the time stats on backend we need to inprove them so
                    we can use them correctly on the front
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button className="w-full px-12 py-2 mb-4 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          edit
                        </button>
                        <button className="w-full px-12 py-2 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black h-full rounded-sm rounded-br-3xl relative sm2:hidden">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                    quis harum
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-40 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button className="w-full px-12 py-2 mb-4 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          edit
                        </button>
                        <button className="w-full px-12 py-2 bg-black bg-opacity-90 text-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </Carousel>
            </div>
            {/* <div className="rightArrow h-full col-span-1 relative">
              <img
                src="https://img.icons8.com/fluent-systems-regular/48/000000/more-than.png"
                className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
              />
            </div> */}
          </div>
        </div>
        {/* <!-- day todos --> */}
        {popUps.todo && (
          <Todos
            changePopUps={changePopUps}
            boxDate={boxDate}
            todos={todos}
            changeNoteId={changeNoteId}
            deleteNotes={deleteNotes}
          />
        )}
        {/* <!-- New flag section --> */}
        {popUps.flag && <Flag changePopUps={changePopUps} />}
        {/* <!-- New note stuff --> */}
        {popUps.newNote && <NewNote changePopUps={changePopUps} />}
        {/* <NewNote /> */}
        {/* <div
          className="newNote h-full w-full absolute top-0 left-0 bg-black bg-opacity-10 popUp3"
          id="newNote"
        >
          <div className="relative w-full h-full">
            <div className="w-70/2 h-1/2 centerSom bg-white border-2 border-black rounded-lg py-8 px-8 lg:w-1/2 md:w-3/4 sm:w-full newNotePop">
              <div className="relative w-full h-full">
                <h3 className="absolute -top-8 -right-5 font-semibold text-2xl hover:text-gray-400">
                  <a href="#header" className="">
                    x
                  </a>
                </h3>
                <div className="w-full h-full grid grid-rows-6 gap-3">
                  <div className="w-full row-span-4 pb-2">
                    <textarea
                      name="note"
                      id="nweNote"
                      cols="20"
                      rows="10"
                      className="w-full h-full border-2 border-black rounded-xl"
                      placeholder="Write your note here..."
                      value="something"
                    ></textarea>
                  </div>
                  <div className="w-full row-span-1 relative">
                    <select
                      name="noteFlag"
                      id="noteFlag"
                      className="w-1/3 rounded-xl border border-black centerSom"
                    >
                      <option value="default">Note Flag</option>
                      <option value="Important">Important</option>
                      <option value="play">Play</option>
                      <option value="Chill">Chill</option>
                    </select>
                  </div>
                  <div className="w-full row-span-1 relative">
                    <button className="w-1/3 py-2 border border-black rounded-xl centerSom hover:bg-black hover:text-white">
                      Create Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <!-- final -->
        <!-- Edit note stuff --> */}
        {popUps.editNote && (
          <EditNote
            changePopUps={changePopUps}
            noteIdForUpdate={noteIdForUpdate.id}
          />
        )}
        {/* <div
          className="newNote h-full w-full absolute top-0 left-0 bg-black bg-opacity-10 popUp4"
          id="editNote"
        >
          <div className="relative w-full h-full">
            <div className="w-70/2 h-1/2 centerSom bg-white border-2 border-black rounded-lg py-8 px-8 lg:w-1/2 md:w-3/4 md:h-2/3 sm:w-full editNotePop">
              <div className="relative w-full h-full">
                <h3 className="absolute -top-8 -right-5 font-semibold text-2xl hover:text-gray-400">
                  <a href="#header" className="">
                    x
                  </a>
                </h3>
                <div className="w-full h-full grid grid-rows-6 gap-3">
                  <div className="w-full row-span-4 pb-2">
                    <textarea
                      name="note"
                      id="editNote"
                      cols="20"
                      rows="10"
                      value="somethig"
                      className="w-full h-full border-2 border-black rounded-xl"
                    >
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nisi, voluptatum! Maiores, exercitationem illum ad
                      corporis natus doloribus cumque fuga, laboriosam
                      accusantium{" "}
                    </textarea>
                  </div>
                  <div className="w-full row-span-1 relative">
                    <select
                      name="noteFlag"
                      id="noteFlag"
                      className="w-1/3 rounded-xl border border-black centerSom"
                    >
                      <option value="default">Note Flag</option>
                      <option value="Important" selected>
                        Important
                      </option>
                      <option value="play">Play</option>
                      <option value="Chill">Chill</option>
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
          </div>
        </div> */}
        {/* <!-- Side bar stuff --> */}
        {popUps.menu && <SideBar changePopUps={changePopUps} />}
        {/* <SideBar changePopUps={changePopUps} /> */}
      </div>
    </Fragment>
  );
}

LoginS.propTypes = {
  auth: PropTypes.object.isRequired,
  todos: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  getTodos: PropTypes.func.isRequired,
  getFlags: PropTypes.func.isRequired,
  getNotes: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  todos: state.todos,
  notes: state.notes,
});

export default connect(mapStateToProps, {
  getTodos,
  getFlags,
  getNotes,
  setAlert,
  deleteNote,
  deleteUser,
})(LoginS);
