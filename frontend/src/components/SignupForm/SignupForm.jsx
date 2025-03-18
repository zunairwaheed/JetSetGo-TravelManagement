import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../context/AuthSlice.jsx";
import toast from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Added loading state
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("SignUp successful!", { position: "top-right" });
      navigate("/login");
    } catch (error) {
      toast.error("SignUp failed. Please try again.", { position: "top-right" });
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-main mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="text" placeholder="Full Name" {...register("username", { required: "Full Name is required" })}
            className={`w-full px-4 py-2 border rounded-md ${errors.username ? "border-red-500" : "border-gray-300"}`} />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <input type="email" placeholder="Email Address" {...register("email", { required: "Email is required" })}
            className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input type="password" placeholder="Password" {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
            className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <input type="password" placeholder="Confirm Password" {...register("confirmPassword", { required: "Confirm Password is required", validate: value => value === watch("password") || "Passwords do not match" })}
            className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          <button type="submit" className="w-full py-2 bg-main text-white font-semibold rounded-md hover:bg-orange-700" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <NavLink to="/login" className="text-main hover:underline">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
