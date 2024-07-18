import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Banner from "../../assets/Banner1.png";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  //isLoading is a property in our custom hook
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success(`${userInfo.username} successfully registered`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="flex h-screen flex-col-reverse divide-[#161622] max-lg:divide-y-4 max-lg:divide-y-reverse lg:flex-row lg:divide-x-4">
      <div className="flex flex-1 flex-col flex-wrap items-center py-10 phone:pl-[5rem] phone:pt-6 lg:py-60 lg:pl-[15rem]">
        {/* SigIn Form */}
        <div className="w-[65%] rounded-xl border-t-4 border-[#161622] p-6 shadow-sm shadow-fuchsia-600 phone:w-[55%] phone:min-w-[20rem] lg:w-[90%]">
          <h1 className="mb-5 text-3xl font-semibold tracking-wider">
            Sign In
          </h1>
          <form
            onSubmit={submitHandler}
            className="container w-full max-phone:w-full"
          >
            <div className="my-8 space-y-3">
              {/* Email */}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
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
              {/* Password */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
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
            <button
              type="submit"
              disabled={isLoading}
              className="group h-12 w-[80%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
            >
              <span className="font-medium text-[#333] group-hover:text-white">
                {isLoading ? "Signing In..." : "Sign In"}
              </span>
            </button>

            {isLoading && <Loader />}
          </form>
          {/*form ended */}
          <div className="mt-6">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-400 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        {/* SignIn Form End */}
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

export default Login;
