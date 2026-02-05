import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Route Navigation
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("http://localhost:4201/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // JSON -> Object
      // Notification : Error
      if (data.error) {
        return toast.error(data.reason[0].msg);
      }
      // Navigate to User Dashboard
      navigate("/login");
    } catch (error) {
      return toast.error("Something went to wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-700 to-indigo-800 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in your details to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-purple-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
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
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
