/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Banner from "../../assets/Banner3.png";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="flex h-dvh flex-col-reverse divide-[#161622] max-lg:divide-y-4 max-lg:divide-y-reverse lg:flex-row lg:divide-x-4">
      <div className="flex flex-1 flex-col flex-wrap items-center py-5 phone:py-6 phone:pl-[5rem] lg:py-32 lg:pl-[10rem]">
        {/* SigIn Form */}
        <div className="w-[65%] rounded-xl border-t-4 border-[#161622] p-6 shadow-sm shadow-fuchsia-600 phone:w-[55%] phone:min-w-[20rem] lg:w-[90%]">
          <h1 className="mb-5 text-3xl font-semibold tracking-wider max-phone:text-2xl">
            Register
          </h1>
          <form
            onSubmit={submitHandler}
            className="container w-full max-phone:w-full"
          >
            <div className="my-8 grid grid-cols-1 gap-6 max-lg:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-white sm:text-sm"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={username}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                />
              </div>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block truncate text-xs font-medium text-white sm:text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="mt-1 w-full rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                />
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-white sm:text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="mt-1 w-full cursor-pointer rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                />
              </div>
              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block truncate text-xs font-medium text-white sm:text-sm"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className="mt-1 w-full cursor-pointer rounded-lg border-2 border-[#3e3e3e] px-6 py-3 text-base text-white transition hover:border-white"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="group h-12 w-[80%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
            >
              <span className="font-medium text-[#333] group-hover:text-white">
                {isLoading ? "Registering..." : "Let's Go"}
              </span>
            </button>

            {isLoading && <Loader />}
          </form>
          {/*form ended */}
          <div className="mt-6">
            <p className="text-white">
              Already have an Account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-pink-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        {/* Register Form End */}
      </div>
      <div className="relative h-64 phone:max-lg:ml-[5rem] lg:h-full lg:w-[53%]">
        <img
          src={Banner}
          alt="BannerImage"
          className="absolute right-0 top-0 h-full w-full object-contain max-lg:py-1 lg:p-20"
        />
      </div>
    </div>
  );
};

export default Register;
