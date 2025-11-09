import React, { use, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash, FaRegEye, FaCar, FaArrowRight, FaUser, FaImage } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";


const Registration = () => {
  const { createUser, updateUserProfile, googleSignIn } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const photo = formData.get('photo');
    const email = formData.get('email');
    const password = formData.get('password');

    // Enhanced password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must contain:\n• 8+ characters\n• Uppercase letter\n• Lowercase letter\n• Number\n• Special character",
        { duration: 6000 }
      );
      setIsLoading(false);
      return;
    }

    try {
      // Create user account
      const result = await createUser(email, password);
      console.log("User created:", result.user);
      
      toast.success('Account created successfully! 🎉', {
        duration: 4000,
        position: 'top-center',
      });

      // Update user profile
      await updateUserProfile({ 
        displayName: name, 
        photoURL: photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
      });

      // Save user to database
      const newUser = { 
        name, 
        email, 
        image: photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        createdAt: new Date().toISOString(),
        role: "user"
      };

      const dbResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const dbData = await dbResponse.json();
      console.log("User saved to DB:", dbData);

      toast.success('Profile updated successfully! ✨', {
        duration: 3000,
        position: 'top-center',
      });

      event.target.reset();
      navigate(location?.state?.from || "/");

    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please use a different email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address format.";
      }

      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success("Google registration successful! 🎉", {
        duration: 4000,
        position: 'top-center',
      });
      navigate(location?.state?.from || "/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google registration failed. Please try again.", {
        duration: 5000,
        position: 'top-center',
      });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      {/* Toaster Component */}
      <Toaster 
        toastOptions={{
          duration: 4000,
          position: 'top-center',
          style: {
            fontSize: '16px',
            padding: '16px',
            borderRadius: '12px',
            fontWeight: '500',
          },
          success: {
            style: {
              background: '#10B981',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
          },
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left Side - Brand & Visual */}
          <div className="lg:w-2/5 bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-12 h-12 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 left-20 w-24 h-24 border-2 border-white rounded-full"></div>
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
                  Join <span className="text-yellow-300">RentWheels</span> Today
                </h1>
                <p className="text-purple-100 text-lg leading-relaxed">
                  Create your account and unlock access to premium car rentals, exclusive deals, and seamless booking experiences.
                </p>
              </div>

              {/* Features List */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-purple-100">Premium car collection</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-purple-100">Instant booking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-purple-100">24/7 customer support</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 text-purple-100">
                <div className="flex-1 h-px bg-purple-400"></div>
                <span>Start your journey with us</span>
                <div className="flex-1 h-px bg-purple-400"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  Join thousands of satisfied customers
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FaUser className="text-purple-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  />
                </div>

                {/* Photo URL Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
                    <FaImage className="text-purple-500" />
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="photo"
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                  />
                  <p className="text-xs text-gray-500">
                    Provide a URL for your profile picture. We'll use a default avatar if left empty.
                  </p>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold text-sm uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a strong password"
                      required
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={handleShowPassword}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaRegEye size={18} />}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>At least 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One number</li>
                      <li>One special character</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">Or sign up with</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Google Sign Up */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 py-4 bg-white text-gray-700 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-400 transform hover:scale-[1.02] transition-all duration-300"
              >
                <FcGoogle size={24} />
                <span className="font-semibold">Sign up with Google</span>
              </button>

              {/* Login Link */}
              <div className="text-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    Sign in
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
        Secure Registration
      </div>
    </div>
  );
};

export default Registration;