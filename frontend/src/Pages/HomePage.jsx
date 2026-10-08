import { useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const isLogin = activeTab === "login";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md">
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex rounded-xl bg-slate-900/40 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isLogin
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                !isLogin
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              {isLogin
                ? "Sign in to continue to your workspace."
                : "Join now and start chatting with your team."}
            </p>
          </div>

          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
