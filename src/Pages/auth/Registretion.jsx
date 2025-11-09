import React, { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Registretion = () => {
  const { createUser, setUser, updateUserProfile, googleSignIn } =
    use(AuthContext);

  const [showPassowrd, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    // console.log('i am register', email, password, name, photo);

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain uppercase, lowercase, and number"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("account was create successfully");

        // const user = result.user;

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // setUser({ ...user, displayName: name, photoURL: photo });

            const newUser = { name, email, image: photo };
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
              });

            event.target.reset();
            toast.success("Name and photo updated successfully");
            navigate(location?.state || "/");
          })

          .catch((error) => {
            console.log(error);
            toast.error("Name or photo URL not updated");
          });
        setUser(result.user);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        console.log(error.code);
        toast.error("user already axist in database");

        if (error.code === "auth/email-already-in-us") {
          toast.error("user already axist in database");
        }
      });
  };

  const handlegoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleShowPassord = () => {
    setShowPassword(!showPassowrd);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-green-500 text-white text-center py-6">
          <h2 className="text-3xl font-extrabold">Register Your Account</h2>
          <p className="text-green-100 mt-1">
            Join us and grow your green space!
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Photo URL */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Enter your photo URL"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="text-gray-700 font-medium mb-2">Password</label>
              <input
                type={showPassowrd ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
              />
              <span
                onClick={handleShowPassord}
                className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-gray-700 transition-all"
              >
                {showPassowrd ? <FaRegEye /> : <FaEyeSlash />}
              </span>
            </div>

            <button className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300">
              Register
            </button>
            <button
              onClick={handlegoogleSignIn}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <FcGoogle size={35} />
              Login with Google
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to={"/auth/login"}
              className="text-green-500 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registretion;
