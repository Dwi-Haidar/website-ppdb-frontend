import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const dummyAdmin = {
  email: "admin@gmail.com",
  password: "zero1755",
};

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error messages

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error message

    if (email === dummyAdmin.email && password === dummyAdmin.password) {
      navigate("/admin");
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: { token: string } = await response.json();
      const { token } = data;
      localStorage.setItem("email", email);
      localStorage.setItem("authToken", token);
      navigate("/admin");
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      setErrorMessage("Email atau password salah. Silakan coba lagi."); // Set error message
      console.error((err as Error).message);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
              {errorMessage}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="your email"
              value={email}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
            >
              <span className="flex items-center justify-center w-6 h-6">
                {showPassword ? "Hidden" : "Show"}
              </span>
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-600 hover:text-green-800 transition duration-200"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;