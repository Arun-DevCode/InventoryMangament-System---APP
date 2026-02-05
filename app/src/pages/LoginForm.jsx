import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Route Navigation
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:4201/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.accessToken) {
        return console.log("Please login first.");
      }

      // Store access Token into localstorage
      localStorage.setItem("accessToken", data.accessToken);

      // Navigate to user dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-purple-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 ${
                errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-purple-500"
              }`}
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-lg font-semibold text-white transition-all duration-300 mt-6 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
