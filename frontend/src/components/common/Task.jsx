import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const Task = ({ post }) => {
  const taskOwner = post.user;
  const queryClient = useQueryClient();

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

  const handlecompleteTask = () => {
    alert("Task completed successfully");
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
