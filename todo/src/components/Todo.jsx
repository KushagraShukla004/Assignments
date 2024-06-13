import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateSearchTerm } from "../redux/actions";
// icons
import { IoIosAdd } from "react-icons/io";
import FilterButtons from "./FilterButtons";
import TodoList from "./TodoList";

const Todo = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
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
    <div className="p-4 rounded  wrapper">
      <h2 className="mt-3 mb-5 text-2xl font-bold text-center ">Todo App</h2>

      {/* input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-grow w-3/4 p-2 text-black border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
          name="addTodoInput"
          id="addTodoInput"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodoClick();
            }
          }}
          placeholder="Add what you want to do and click + or press Enter"
        />
        <button
          className="size-9 ml-4 px-1.5 bg-aquaCyan text-black rounded hover:bg-darkAqua focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <IoIosAdd size={25} />
        </button>
      </div>

      {/* filter and search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow w-3/4 p-2 text-black border-b-2 border-gray-300 focus:outline-none focus:border-blue-600"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>
      <TodoList />
    </div>
  );
};

export default Todo;
