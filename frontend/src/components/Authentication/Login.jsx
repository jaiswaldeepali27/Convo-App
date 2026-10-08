import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
      e.preventDefault();

      if(!email || !password) {
        toast.warn("Please enter email and password");
        return;
      }

      setLoading(true);

      try {
        const config = {
          headers : {
            "Content-type" : "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/user/login",
          {
            email,
            password,
          },
          config
        );

        console.log("Login res", data);

        localStorage.setItem("userInfo", JSON.stringify(data));

        toast.success("Login successful");

        navigate("/chats");
        
      } catch (error) {
        console.error("Login error:", error);

        toast.error(
          error.response?.data?.message || "Invalid email or password",
        );
      } finally {
        setLoading(false);
      }
    }
  return (
    <>
    <form className="space-y-4" onSubmit={submitHandler}>
      <div>
        <label
          htmlFor="login-email"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="login-password"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-sm text-cyan-400 hover:text-cyan-300"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-300">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-500 bg-slate-900"
          />
          Remember me
        </label>
        <button type="button" className="text-cyan-400 hover:text-cyan-300">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled= {loading}
        className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        {loading ? "Logging In....": "Login"}
      </button>
    </form>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
      />
      </>
  );
};

export default Login