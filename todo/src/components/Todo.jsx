import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateSearchTerm } from "../redux/actions";
// icons
import { IoIosAdd } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import FilterButtons from "./FilterButtons";

const Todo = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTodo = (text) => {
    dispatch(addTodo(text));
  };

  const handleAddTodoClick = () => {
    if (newTodo.trim() !== "") {
      handleAddTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  return (
    <div className="p-4 rounded wrapper">
      <h2 className="mt-3 mb-5 text-2xl font-bold text-center ">Todo App</h2>

      {/* input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-grow w-3/4 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-violet-900"
          name="addTodoInput"
          id="addTodoInput"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          placeholder="Add what you want to do and click +"
        />
        <button
          className="size-9 ml-4 px-1.5 bg-aquaCyan text-darkGray rounded hover:bg-darkAqua focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <IoIosAdd size={25} />
        </button>
      </div>

      {/* filter and search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-violet-900"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="size-9 ml-4 px-2 bg-aquaCyan text-darkGray rounded hover:bg-darkAqua focus:outline-none">
            <IoSearch size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
