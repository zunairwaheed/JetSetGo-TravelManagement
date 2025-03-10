import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../context/AuthSlice.jsx";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            navigate("/");
            window.location.reload();
        } catch (err) {
            console.error("Login failed:", err);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-main mb-6">
                    Welcome Back!
                </h2>
                <p className="text-center text-sm text-gray-500 mb-8">
                    Please login to your account
                </p>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "Email is required" })}
                            className={`mt-1 block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            className={`mt-1 block w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-main text-white font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-main"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{" "}
                        <NavLink to="/signup" className="text-main hover:underline">
                            Sign up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
