import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="container mx-auto p-4 pt-[10rem]">
      <div className="flex items-center justify-center phone:max-sm:pl-20 md:flex md:space-x-4">
        {/* SigIn Form */}
        <div className="w-[60%] rounded-xl border-t-4 border-fuchsia-700 p-6 shadow-sm shadow-fuchsia-600 phone:min-w-[20rem] phone:max-md:w-[65%] lg:w-[65%]">
          <h1 className="mb-5 text-3xl font-semibold tracking-wider max-phone:text-2xl">
            Update Your Profile
          </h1>
          <form
            onSubmit={submitHandler}
            className="container w-full max-phone:w-full"
          >
            <div className="my-8 space-y-6">
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
                    setUserName(e.target.value);
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
            <div className="flex w-full justify-between max-phone:flex-col">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="group h-12 w-[80%] cursor-pointer rounded-3xl border-2 border-[#9748FF] bg-white shadow-[inset_0px_-2px_0px_1px_#9748FF] transition duration-300 ease-in-out hover:bg-[#9748FF] phone:w-40"
              >
                <span className="font-medium text-[#333] group-hover:text-white">
                  {loadingUpdateProfile ? "Saving..." : "Save Changes"}
                </span>
              </button>
              <Link
                to="/user-orders"
                className="rounded-lg bg-gradient-to-r from-indigo-500 from-30% to-purple-500 to-90% p-3 font-bold tracking-wider text-white transition-colors hover:bg-purple-600/90 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
          {/*form ended */}
        </div>
        {/* Register Form End */}
      </div>
    </div>
  );
};

export default Profile;
