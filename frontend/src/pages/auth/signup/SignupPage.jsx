import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="hero bg-base-300 absolute inset-0 flex items-center justify-center">
      <div className="hero-content flex-col w-5/6">
        <div className="text-center p-3">
          <h1 className="text-4xl font-medium">Sign up | Task Master</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Full name"
                className="input input-bordered "
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign up</button>
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
