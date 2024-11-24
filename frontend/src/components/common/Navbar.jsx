import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

  // create post
  const [text, setText] = useState("");

  // get current user and reset query
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  // create post function
  const { mutate: createPost } = useMutation({
    mutationFn: async ({ text }) => {
      try {
        const res = await fetch("/api/tasks/create", {
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
      toast.success("Task created successfully");
      setText("");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = () => {
    createPost({ text });
  };

  // logout function
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout/", {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      // refetch the authUser
      window.location.href = "/login";
    },
    onError: () => {
      console.error("Logout failed");
    },
  });

  // Function to toggle the theme
  const handleToggle = () => {
    const newTheme = theme === "retro" ? "dark" : "retro"; // Switch themes
    setTheme(newTheme); // Update state
    document.documentElement.setAttribute("data-theme", newTheme); // Update HTML attribute
  };

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-300 mt-2">
        <div className="flex-1">
          <p className="pl-5 text-2xl">Task Master</p>
        </div>
        <div className="flex-none gap-2 mr-6">
          <div className="form-control w-14">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={handleToggle}
                checked={theme === "dark"}
              />
            </label>
          </div>
          <div className="form-control w-20">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-20 md:w-auto"
            />
          </div>
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <FaPencilAlt />
          </button>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center mb-3">
                Create Task
              </h3>
              <input
                type="text"
                placeholder="create new task"
                className="input input-bordered w-full max-w-sm"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <form method="dialog">
                <button className="btn btn-success ml-3" onClick={handleSubmit}>
                  <FaPencilAlt />
                </button>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <div className="w-10 rounded-full">
                <p>{authUser.username}</p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <p onClick={logout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
