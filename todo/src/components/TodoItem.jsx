import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, removeTodo, markCompleted, markIncomplete } from "../redux/actions";
import PropTypes from "prop-types";
//icons
import { FaTrash, FaCheck, FaTimes, FaEdit, FaSave } from "react-icons/fa";

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && newText.trim() !== "") {
      dispatch(editTodo(index, newText.trim()));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col  sm:flex-row sm:items-center justify-between text-black bg-aquaCyan border-aquaCyan rounded py-2 px-2 mb-3 shadow-xl hover:shadow-md ">
      <div className="flex items-center">
        <span className="mr-4 text-black">{index + 1}.</span>
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="mr-4 p-1 border border-gray-400 focus:outline-none focus:border-violet-900"
          />
        ) : (
          <span className={`mr-4 ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="space-x-3 ml-8">
        <button
          className="ml-2 p-2 sm:px-3 bg-violet-600 text-white rounded hover:bg-violet-800 focus:outline-none"
          onClick={handleEdit}
        >
          {isEditing ? <FaSave size={15} /> : <FaEdit size={15} />}
        </button>
        <button
          className="mr-2 text-sm bg-red-500 hover:bg-red-700 text-white sm:px-3 p-2 rounded"
          onClick={() => dispatch(removeTodo(index))}
        >
          <FaTrash size={15} />
        </button>
        {!todo.completed && (
          <button
            className="text-sm bg-green-700 hover:bg-green-800 text-white sm:px-3 p-2 rounded"
            onClick={() => dispatch(markCompleted(index))}
          >
            <FaCheck />
          </button>
        )}
        {todo.completed && (
          <button
            className="text-sm bg-yellow-500 text-black sm:px-2 px-1 py-1 rounded"
            onClick={() => dispatch(markIncomplete(index))}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object,
  index: PropTypes.number,
};
export default TodoItem;
