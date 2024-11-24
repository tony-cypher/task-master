import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const Task = ({ post }) => {
  // const taskOwner = post.user;
  const queryClient = useQueryClient();

  const [text, setText] = useState("");

  // update post
  const { mutate: updateTask } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/tasks/update/${post._id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.log(data.error);
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      // reset the form state
      toast.success("Task updated successfully");
      setText("");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // delete function
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/tasks/delete/${post._id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Task deleted successfully");
      // refetch the posts
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleDeleteTask = () => {
    deletePost();
  };

  const handleUpdateTask = () => {
    updateTask();
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  return (
    <div className="card bg-base-300 shadow-lg flex-grow max-w-xs sm:max-w-sm md:max-w-md">
      <div className="card-body">
        <p>{post.text}</p>

        <div className="card-actions">
          <button className="btn btn-error" onClick={handleDeleteTask}>
            {isDeleting ? <LoadingSpinner /> : <FaTrash />}
          </button>

          <button
            className="btn btn-success ml-auto"
            onClick={() => document.getElementById(post._id).showModal()}
          >
            <FaPencilAlt />
          </button>
          <dialog id={post._id} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center mb-3">
                Update Task
              </h3>
              <input
                type="text"
                placeholder="create new task"
                className="input input-bordered w-full max-w-sm"
                onChange={handleInputChange}
                value={text}
              />

              <form method="dialog">
                <button
                  className="btn btn-success ml-3"
                  onClick={handleUpdateTask}
                >
                  <FaPencilAlt />
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Task;
