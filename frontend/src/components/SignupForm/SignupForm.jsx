import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { BASE_URL } from "../../utils/config";

const Signup = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword, 
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      dispatch({ type: "REGISTER_SUCCESS" });
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-main mb-6">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Sign up to start your journey
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField 
            id="username" label="Full Name" type="text" register={register} errors={errors} required 
          />
          <InputField 
            id="email" label="Email Address" type="email" register={register} errors={errors} required 
          />
          <InputField 
            id="password" label="Password" type="password" register={register} errors={errors} required minLength={6} 
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            register={register}
            errors={errors}
            required
            validate={(value) => value === watch("password") || "Passwords do not match"}
          />
          <button
            type="submit"
            className="w-full py-2 bg-main text-white font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-main"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink to="/login" className="text-main hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, type, register, errors, required, minLength, validate }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register(id, {
        required: required ? `${label} is required` : false,
        minLength: minLength && { value: minLength, message: `${label} must be at least ${minLength} characters long` },
        validate,
      })}
      className={`mt-1 block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main ${
        errors[id] ? "border-red-500" : "border-gray-300"
      }`}
    />
    {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
  </div>
);

export default Signup;
