import React, { Fragment, useState } from "react";
import Carousel, { consts } from "react-elastic-carousel";
import PropTypes from "prop-types";
import { newTodo, updateTodo, deleteTodo } from "../../actions/todos";
import IndividualTodo from "../individual/IndividualTodo";
import { Scrollbars } from "react-custom-scrollbars";
//redux stuff
import { connect } from "react-redux";

function Todos({
  changePopUps,
  flags,
  boxDate,
  newTodo,
  todos,
  notes,
  updateTodo,
  deleteTodo,
  changeNoteId,
  deleteNotes,
}) {
  const [todo, setTodo] = useState({
    title: "",
    flag: "",
  });
  const [indiTodo, setIndiTodo] = useState({
    title: null,
  });
  function changeIndiTodo(e) {
    let titleT = e.currentTarget.id;
    setIndiTodo({ title: titleT });
  }
  function disableIndiTodo() {
    setIndiTodo({ title: null });
  }
  function changeNewTodo(event) {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }
  function submitTodo(e) {
    e.preventDefault();
    const todoReady = {
      title: todo.title,
      selector: "2021-" + boxDate.month + "-" + boxDate.day,
    };
    newTodo(todoReady, todo.flag);
    todo.title = "";
    todo.flag = "";
  }
  function updateTodoFunc(e) {
    const checked = e.currentTarget.checked;
    const id = e.currentTarget.id;
    // console.log(e.target.checked);
    // console.log(e.target.id);
    updateTodo(checked, id);
  }
  //carousel stuff
  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 268, itemsToShow: 2, pagination: false },
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
  function deleteTodoFunc(e) {
    e.preventDefault();
    deleteTodo(e.currentTarget.id);
  }
  return (
    <div
      className="day w-full h-full controlPopUpH bg-black bg-opacity-10 absolute top-0 left-0"
      id="todos"
    >
      <div className="relative w-full h-full controlPopUpH">
        <div className="day-content w-70/2 h-3/4 controlPopUpH bg-white border-3 border-black rounded-lg centerSom p-4 grid grid-rows-10 relative lg3:w-2/5 lg2:w-90/2 lg:w-1/2 md3:w-3/5 md2:w-140/2 md:w-4/5 md:h-full sm2:w-full sm:px-0">
          <div className="w-full row-span-2 relative">
            <h3 className="absolute top-0 right-0 font-semibold text-2xl hover:text-gray-400 sm:right-4 sm:text-3xl">
              <a
                role="button"
                className=""
                onClick={() => {
                  changePopUps("todo");
                }}
              >
                x
              </a>
            </h3>
            <h1 className="text-7xl text-center h-3/5 md:text-6xl">
              {boxDate.day}
            </h1>
            <h2 className="text-3xl uppercase text-center h-2/5 pt-2 font-light tracking-normal md:text-2xl">
              {boxDate.month}
            </h2>
          </div>
          <div className="w-full row-span-1 border-t border-gray-600 relative">
            <form onSubmit={(e) => submitTodo(e)} className="w-full h-full">
              <div className="w-full inside absolute top-1/2 transform -translate-y-1/2 px-3 grid grid-cols-9 gap-2 rsm:px-1">
                <input
                  type="text"
                  name="title"
                  id="todo"
                  value={todo.title}
                  onChange={changeNewTodo}
                  className="rounded-xl w-full border-2 border-black col-span-6"
                  placeholder="Add new todo here..."
                />
                <select
                  name="flag"
                  value={todo.flag}
                  onChange={changeNewTodo}
                  id="flagSelect"
                  className="rounded-xl ml-0 border-2 border-black col-span-2 w-4/5 sm:w-full"
                >
                  <option value="Flag" selected>
                    Flag
                  </option>
                  {flags
                    .filter((flag) => flag.tipo === "Todo")
                    .map((flag) => (
                      <option value={flag._id} key={flag._id}>
                        {flag.title}
                      </option>
                    ))}
                  {/* <option value="Important">Important</option>
                <option value="Studies">Studies</option>
                <option value="Play">play</option> */}
                </select>
                <button
                  type="submit"
                  className="bg-white border-2 border-black py-2 px-3 rounded-xl col-span-1 text-center transition duration-200 ease-in-out hover:bg-black hover:text-white rsm:px-0"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          {/* <!-- start of todos listing --> */}
          <div className="w-full h-full row-span-4">
            <ul className="w-full h-full overflow-auto py-2 pl-0 pr-3">
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
                {todos !== null ? (
                  todos.todos
                    .filter(
                      (todo) =>
                        todo.selector ===
                        "2021-" + boxDate.month + "-" + boxDate.day
                    )
                    .map((todo) => (
                      <li className="w-full h-1/5 relative">
                        <div className="w-full h-full grid grid-cols-16">
                          <div className="col-span-1 relative">
                            <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                          </div>
                          <div className="col-span-13 relative">
                            <div className="absolute centerVertical w-full text-xl">
                              <p
                                className={`text-center ${
                                  todo.isCompleted ? "line-through" : ""
                                }`}
                                id={todo.title}
                                onClick={(e) => changeIndiTodo(e)}
                              >
                                {todo.title.length > 100
                                  ? `${todo.title.substring(0, 100)}...`
                                  : todo.title}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 relative">
                            <div className="w-full absolute centerVertical">
                              <div className="h-8 relative">
                                <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                                  <input
                                    type="checkbox"
                                    id={todo._id}
                                    name="isCompleated"
                                    onChange={(e) => updateTodoFunc(e)}
                                    defaultChecked={todo.isCompleted}
                                    className={`w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black`}
                                  />
                                </div>
                                <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                                  <button
                                    id={todo._id}
                                    onClick={(e) => deleteTodoFunc(e)}
                                    className="bg-none text-4xl w-full -mt-2 hover:text-gray-400"
                                  >
                                    x
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                ) : (
                  <h1 className="text-lg text-gray-500 text-center pt-4">
                    No todos added yet.{" "}
                  </h1>
                )}
                {/* <li className="w-full h-1/5 relative">
                <div className="w-full h-full grid grid-cols-16">
                  <div className="col-span-1 relative">
                    <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                  </div>
                  <div className="col-span-13 relative">
                    <div className="absolute centerVertical w-full text-xl">
                      <p className="text-center">Go to the cinema with dome.</p>
                    </div>
                  </div>
                  <div className="col-span-2 relative">
                    <div className="w-full absolute centerVertical">
                      <div className="h-8 relative">
                        <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                          <input
                            type="checkbox"
                            name="isCompleated"
                            id="isCompleated"
                            className="w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black"
                          />
                        </div>
                        <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                          <button className="bg-none text-4xl w-full -mt-2 hover:text-gray-400">
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="w-full h-1/5 border-border-black">
                <div className="w-full h-full grid grid-cols-16">
                  <div className="col-span-1 relative">
                    <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                  </div>
                  <div className="col-span-13 relative">
                    <div className="absolute centerVertical w-full text-xl">
                      <p className="text-center">
                        Do the laundry on monday at 5!
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 relative">
                    <div className="w-full absolute centerVertical">
                      <div className="h-8 relative">
                        <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                          <input
                            type="checkbox"
                            name="isCompleated"
                            id="isCompleated"
                            className="w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black"
                          />
                        </div>
                        <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                          <button className="bg-none text-4xl w-full h-full -mt-2 hover:text-gray-400">
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="w-full h-1/5 border-border-black">
                <div className="w-full h-full grid grid-cols-16">
                  <div className="col-span-1 relative">
                    <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                  </div>
                  <div className="col-span-13 relative">
                    <div className="absolute centerVertical w-full text-xl">
                      <p className="text-center">
                        Pay our college fee max:10 march
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 relative">
                    <div className="w-full absolute centerVertical">
                      <div className="h-8 relative">
                        <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                          <input
                            type="checkbox"
                            name="isCompleated"
                            id="isCompleated"
                            className="w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black"
                          />
                        </div>
                        <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                          <button className="bg-none text-4xl w-full h-full -mt-2 hover:text-gray-400">
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="w-full h-1/5 border-border-black">
                <div className="w-full h-full grid grid-cols-16">
                  <div className="col-span-1 relative">
                    <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                  </div>
                  <div className="col-span-13 relative">
                    <div className="absolute centerVertical w-full text-xl">
                      <p className="text-center">
                        Go Bother nathy at least every hour cause its our job
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 relative">
                    <div className="w-full absolute centerVertical">
                      <div className="h-8 relative">
                        <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                          <input
                            type="checkbox"
                            name="isCompleated"
                            id="isCompleated"
                            className="w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black"
                          />
                        </div>
                        <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                          <button className="bg-none text-4xl w-full h-full -mt-2 hover:text-gray-400">
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="w-full h-1/5 border-border-black">
                <div className="w-full h-full grid grid-cols-16">
                  <div className="col-span-1 relative">
                    <div className="w-3 h-3 rounded-full bg-black centerSom"></div>
                  </div>
                  <div className="col-span-13 relative">
                    <div className="absolute centerVertical w-full text-xl">
                      <p className="text-center">
                        Do the math homeworks for tomorrow
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 relative">
                    <div className="w-full absolute centerVertical">
                      <div className="h-8 relative">
                        <div className="checkbox h-6 w-6 absolute left-7 centerVertical">
                          <input
                            type="checkbox"
                            name="isCompleated"
                            id="isCompleated"
                            className="w-full h-full -mt-1 rounded-full border-2 border-black text-black focus:border-gray-300 focus:ring-black"
                          />
                        </div>
                        <div className="checkbox h-15 w-6 absolute left-14 centerVertical">
                          <button className="bg-none text-4xl w-full h-full -mt-2 hover:text-gray-400">
                            x
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
              </Scrollbars>
            </ul>
          </div>
          {/* <!-- start of day notes --> */}
          <div className="w-full row-span-3 border-t border-gray-600 relative p-2">
            <div className="notes-container w-full h-full absolute top-1/2 left-0 transform -translate-y-1/2  py-2">
              {/* <div className="leftArrow h-full col-span-1 relative">
                <img
                  src="https://img.icons8.com/fluent-systems-regular/48/000000/less-than.png"
                  className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div> */}
              <Carousel
                renderArrow={myArrow}
                breakPoints={breakPoints}
                className="w-full h-full"
                showEmptySlots
              >
                {/* <div className="notesBox h-full col-span-10">
                <div className="w-full h-full grid grid-cols-2 gap-4"> */}
                {notes.notes !== null &&
                  notes.notes.notes.map((note) => (
                    <div
                      key={note._id}
                      className="border-2 border-black w-11/12 h-full rounded-sm rounded-br-3xl relative"
                    >
                      <p className="note-text w-full h-full p-4 font-extralight italic">
                        {note.text.length > 180
                          ? `${note.text.substring(0, 180)}...`
                          : note.text}
                      </p>
                      <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                        <div className="w-full h-full relative">
                          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            {/* <button className="w-full px-12 py-2 mb-4 bg-white border-2 border-black rounded-md uppercase button-shadow">
                              edit
                            </button>
                            <button className="w-full px-12 py-2 bg-white border-2 border-black rounded-md uppercase button-shadow">
                              delete
                            </button> */}
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
                {/* <div className="border-2 border-black w-11/12 h-full rounded-sm rounded-br-3xl relative">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates dolor excepturi neque deleniti porro accusantium.
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button className="w-full px-12 py-2 mb-4 bg-white border-2 border-black rounded-md uppercase button-shadow">
                          edit
                        </button>
                        <button className="w-full px-12 py-2 bg-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black h-full w-11/12 rounded-sm rounded-br-3xl relative">
                  <p className="note-text w-full h-full p-4 font-extralight italic">
                    We need to make sure everything is good to go on the dome
                    stuff cause big day is on saturdar and its just 3 day
                    away!!!
                  </p>
                  <div className="w-full h-full bg-black bg-opacity-20 absolute top-0 left-0 rounded-br-3xl z-50 opacity-0 transition duration-200 ease-in-out hover:opacity-100">
                    <div className="w-full h-full relative">
                      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <button className="w-full px-12 py-2 mb-4 bg-white border-2 border-black rounded-md uppercase button-shadow">
                          edit
                        </button>
                        <button className="w-full px-12 py-2 bg-white border-2 border-black rounded-md uppercase button-shadow">
                          delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* </div>
              </div> */}
                {/* <div className="rightArrow h-full col-span-1 relative">
                <img
                  src="https://img.icons8.com/fluent-systems-regular/48/000000/more-than.png"
                  className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
                />
              </div> */}
              </Carousel>
            </div>
          </div>
          {/* <!-- start of todos individual popup --> */}
          {indiTodo.title !== null ? (
            <IndividualTodo
              indiTodo={indiTodo}
              disableIndiTodo={disableIndiTodo}
            />
          ) : (
            ""
          )}
          {/* <div className="todo_indi w-2/3 h-1/4 centerSom bg-white border-2 border-black hidden">
            <div className="w-full h-full relative">
              <h3 className="absolute top-0 right-3 font-semibold text-2xl hover:text-gray-400">
                <a href="#header" className="">
                  x
                </a>
              </h3>
              <div className="w-4/5 h-4/5 centerSom overflow-auto text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                delectus nesciunt quasi? Nisi repellendus inventore repellat non
                atque eos distinctio earum beatae nostrum, error nemo enim
                cupiditate mollitia
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

Todos.propTypes = {
  changePopUps: PropTypes.func.isRequired,
  flags: PropTypes.array.isRequired,
  notes: PropTypes.object.isRequired,
  boxDate: PropTypes.object.isRequired,
  newTodo: PropTypes.func.isRequired,
  todos: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  changeNoteId: PropTypes.func.isRequired,
  deleteNotes: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  flags: state.flag.flags.flags,
  notes: state.notes,
});
export default connect(mapStateToProps, { newTodo, updateTodo, deleteTodo })(
  Todos
);
