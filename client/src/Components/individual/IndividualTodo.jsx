import React from "react";
import PropTypes from "prop-types";

function IndividualTodo({ indiTodo: { title }, disableIndiTodo }) {
  //   return indiTodo !== null ? (
  //     <div className="todo_indi w-2/3 h-1/4 centerSom bg-white border-2 border-black">
  //       <div className="w-full h-full relative">
  //         <h3 className="absolute top-0 right-3 font-semibold text-2xl hover:text-gray-400">
  //           <a href="#header" className="">
  //             x
  //           </a>
  //         </h3>
  //         <div className="w-4/5 h-4/5 centerSom overflow-auto text-center">
  //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
  //           delectus nesciunt quasi? Nisi repellendus inventore repellat non atque
  //           eos distinctio earum beatae nostrum, error nemo enim cupiditate
  //           mollitia
  //         </div>
  //       </div>
  //     </div>
  //   ) : null;
  return (
    <div className="todo_indi w-2/3 h-1/4 centerSom bg-white border-2 border-black">
      <div className="w-full h-full relative">
        <h3 className="absolute top-0 right-3 font-semibold text-2xl hover:text-gray-400">
          <a
            role="button"
            className=""
            onClick={() => {
              disableIndiTodo();
            }}
          >
            x
          </a>
        </h3>
        <div className="w-4/5 h-4/5 centerSom overflow-auto text-center">
          {title}
        </div>
      </div>
    </div>
  );
}

IndividualTodo.propTypes = {
  indiTodo: PropTypes.object.isRequired,
  disableIndiTodo: PropTypes.func.isRequired,
};

export default IndividualTodo;
