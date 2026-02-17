import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowLogin, setUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      if (!name || !mobile) {
        alert("Please fill all fields");
        return;
      }

      if (users.find((u) => u.email === email)) {
        alert("User already exists");
        return;
      }

      users.push({ name, email, mobile, password });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Account created successfully!");
      const newUser = { name, email, mobile };
      setUser(newUser);
      localStorage.setItem("loggedUser", JSON.stringify(newUser));
      setIsSignup(false);

      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setShowLogin(false);
      return;
    }

    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    setUser(user);
    alert(`Welcome ${user.name}`);
    setShowLogin(false);
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center text-sm text-gray-700 bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]"
      >
        <p className="text-2xl font-medium text-center">
          <span className="text-indigo-500">User</span>{" "}
          {isSignup ? "Sign Up" : "Login"}
        </p>

        {/* Signup extra fields */}
        {isSignup && (
          <>
            <div className="mt-4">
              <label className="block">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              />
            </div>

            <div className="mt-4">
              <label className="block">Mobile Number</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              />
            </div>
          </>
        )}

        <div className="mt-4">
          <label className="block">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          />
        </div>

        <div className="mt-4">
          <label className="block">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          />
        </div>

        <p className="mt-4 text-center">
          {isSignup ? "Already have account?" : "Create an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-500 cursor-pointer ml-1"
          >
            Click here
          </span>
        </p>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
