// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// interface LoginProps {
//   setIsAuthenticated: (value: boolean) => void;
// }

// const Login = ({ setIsAuthenticated }: LoginProps) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError(null); // Clear error on change
//   };

//   // Handle login submission (mock for now)
//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError("All fields are required.");
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }
//     // Mock login success (replace with API call)
//     console.log("Login data:", formData);
//     alert("Login successful! (Mock)");
//     setIsAuthenticated(true); // Mock authentication
//     navigate("/"); // Redirect to home (in a real app, after backend confirmation)
//   };

//   return (
//     <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex items-center justify-center">
//       <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
//         <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//           />
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
//           />
//           {error && <p className="text-red-400 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="w-full p-2 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition"
//           >
//             Log In
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-blue-400 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
}

const Login = ({ setIsAuthenticated }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  // Handle login submission with API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 🔹 API call to your Django backend
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // localStorage.setItem("token", data.access);
        const errData = await response.json();
        throw new Error(errData.detail || "Login failed.");
      }

      const data = await response.json();
      console.log("Login response:", data);

      // 🔹 Save token to localStorage (if backend returns JWT/Token)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setIsAuthenticated(true);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-4 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-gray-500 rounded-full text-lg font-semibold hover:bg-gray-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
