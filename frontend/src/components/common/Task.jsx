import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Task = ({ post }) => {
  const taskOwner = post.user;

  const handleDeleteTask = () => {
    alert("Task deleted");
  };

  const handlecompleteTask = () => {
    alert("Task completed successfully");
  };
  return (
    <div className="card bg-base-300 shadow-lg flex-grow max-w-xs sm:max-w-sm md:max-w-md">
      <div className="card-body">
        <p>{post.text}</p>

        <div className="card-actions">
          <button className="btn btn-error" onClick={handleDeleteTask}>
            <FaTrash />
          </button>
          <button
            className="btn btn-success ml-auto"
            onClick={handlecompleteTask}
          >
            <IoCheckmarkDoneSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
