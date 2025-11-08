import React from "react";
import { Link } from "react-router";

const Login = () => {

const {createUser}






  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-green-500 text-white text-center py-6">
          <h2 className="text-3xl font-extrabold">Login to Your Account</h2>
          <p className="text-green-100 mt-1">
            Welcome back! Please login to continue
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={hanleLogIn} className="space-y-5">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="Email"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-gray-700 font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
              <span
                onClick={handleShowPassord}
                className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* Forget Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-green-600 hover:underline text-sm font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handlegoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FcGoogle size={35} />
            Login with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-green-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
