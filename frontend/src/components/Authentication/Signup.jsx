import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const cloudName = "dzi5yla1g";
const uploadPreset = "convo-app";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPic, setIsUploadingPic] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePicUpload = async (file) => {
    // setIsUploadingPic(true);

    if (!file) {
      setPic("");
      // setIsUploadingPic(false);
      // toast.error("Please select the image");
      return;
    }
    console.log(file)
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setPic("");
      setIsUploadingPic(false);
      toast.error("Please select a JPG or PNG image");
      return;
    }

    setIsUploadingPic(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("cloud_name", cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await response.json();

      console.log("Cloudinary response:", result);

      if (!response.ok || !result.secure_url) {
        throw new Error(result.error?.message || "Image upload failed");
      }

      setPic(result.secure_url);
      setError("");
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      setPic("");
      setError("Could not upload the selected image file.");
      toast.error(error.message || "Could not upload image");
    } finally {
      setIsUploadingPic(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast.warn("Please Fill all the Feilds", {
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      setLoading(false);
      return;
    }
    if(password !== confirmPassword) {
      toast.warn("Passwords do not match", {
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      setLoading(false);
      return;
    }
    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config,
      );
      console.log(data);
      toast.success("Registration Successfull", {
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log("Registration error", error);
      toast.error(error.response?.data?.message || "Registration failed", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
    <form className="space-y-4" onSubmit={submitHandler}>
      <div>
        <label
          htmlFor="signup-name"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Full Name
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          autoComplete="name"
          required
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="signup-email"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          autoComplete="email"
          required
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="signup-password"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="new-password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 pr-11 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-cyan-400 hover:text-cyan-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-confirm-password"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="signup-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            autoComplete="new-password"
            required
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 pr-11 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-sm text-cyan-400 hover:text-cyan-300"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-pic"
          className="mb-1 block text-sm font-medium text-slate-200"
        >
          Profile Picture (optional)
        </label>
        <input
          id="signup-pic"
          type="file"
          accept="image/*"
          onChange={(e) => handlePicUpload(e.target.files?.[0])}
          className="w-full rounded-xl border border-slate-600 bg-slate-950/40 px-4 py-3 text-white file:mr-4 file:rounded file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-cyan-400 focus:border-cyan-400 focus:outline-none"
        />
        {isUploadingPic && (
          <p className="mt-2 text-sm text-cyan-300">Uploading image...</p>
        )}
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || isUploadingPic}
        className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creating account..." : isUploadingPic ? "Uploading Image ...." : "Create account"}
      </button>

    </form>

    <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </>
  );
};

export default Signup;
