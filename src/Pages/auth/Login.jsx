import React, { use, useRef, useState } from "react";

import { FaEyeSlash, FaRegEye, FaCar, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";


const Login = () => {
  const { signInUser, googleSignIn } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const email = e.target.email?.value;
    const password = e.target.password.value;

    try {
      await signInUser(email, password);
      toast.success("Welcome back! Login successful 🎉");
      navigate(location?.state || "/");
      e.target.reset();
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please provide your email address to reset password");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox. 📧");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to send reset email. Please try again.");
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Google login successful! 🎉");
      navigate(location?.state || "/");
    } catch (error) {
      console.log(error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Brand & Visual */}
          <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-3 mb-8 group">
                <div className="p-2 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300">
                  <FaCar className="text-2xl text-white" />
                </div>
                <span className="text-2xl font-bold">RentWheels</span>
              </Link>

              <div className="mt-8">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  Welcome Back to <span className="text-yellow-300">RentWheels</span>
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Ready to continue your journey? Sign in to access your favorite cars and manage your bookings.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 text-blue-100">
                <div className="flex-1 h-px bg-blue-400"></div>
                <span>Your trusted car rental partner</span>
                <div className="flex-1 h-px bg-blue-400"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign In to Your Account
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to access your dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      ref={emailRef}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleForgetPassword}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Or continue with</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white text-gray-700 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-400 transform hover:scale-[1.02] transition-all duration-300"
              >
                <FcGoogle size={24} />
                <span className="font-semibold">Sign in with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    Create account
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={12} />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 flex items-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        Secure Authentication
      </div>
    </div>
  );
};

export default Login;