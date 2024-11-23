import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");
  const [text, setText] = useState("");

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

  const handleSubmit = () => {
    alert(`Successfully added ${text}`);
    setText("");
  };

  return (
    <div className="container mx-auto">
      <div className="navbar bg-base-300 mt-2">
        <div className="flex-1">
          <p className="pl-5 text-2xl">Task Master</p>
        </div>
        <div className="flex-none gap-2">
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
            <FaPlus />
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
              <button className="btn btn-success ml-3" onClick={handleSubmit}>
                Add
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
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
