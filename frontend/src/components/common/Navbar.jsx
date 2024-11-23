import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState("dark");

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
          <ul className="menu menu-horizontal w-14">
            <li>
              <p>
                <FaPlus />
              </p>
            </li>
          </ul>
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
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
