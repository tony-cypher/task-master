import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="hero bg-base-300 absolute inset-0 flex items-center justify-center">
      <div className="hero-content flex-col w-5/6">
        <div className="text-center p-3">
          <h1 className="text-4xl font-medium">Task Master | Login!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
          <div className="label mb-3 ml-5">
            <span className="label-text-alt">
              Not yet a member?
              <Link to="/signup">
                <span href="" className=" pl-2 label-text-alt link link-hover">
                  sign up
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
