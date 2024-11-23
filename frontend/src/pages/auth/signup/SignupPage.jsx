import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const {
    mutate: registerMutation,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, username, fullname, password }) => {
      try {
        const res = await fetch("/api/auth/signup/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, fullname, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="hero bg-base-300 absolute inset-0 flex items-center justify-center">
      <div className="hero-content flex-col w-5/6">
        {isError && (
          <div role="alert" className="alert alert-error w-full md:w-1/3 mt-3">
            <VscError />
            <span>{error.message}</span>
          </div>
        )}
        <div className="text-center p-3">
          <h1 className="text-4xl font-medium">Sign up | Task Master</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered "
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered "
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Full name"
                className="input input-bordered "
                name="fullname"
                onChange={handleInputChange}
                value={formData.fullname}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {isPending ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
          <div className="label mb-3 ml-5">
            <span className="label-text-alt">
              Already a member?
              <Link to="/login">
                <span href="" className=" pl-2 label-text-alt link link-hover">
                  login
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
