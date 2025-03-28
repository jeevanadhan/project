import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();

  const checkPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) {
      setPasswordStrength("Weak ❌");
    } else if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.match(/[@$!%*?&]/)) {
      setPasswordStrength("Strong ✅");
    } else {
      setPasswordStrength("Medium ⚠️");
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && username) {
      localStorage.setItem("user", JSON.stringify({ username, email }));
      navigate("/");
    } else {
      alert("Please enter all details.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <motion.form 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 p-8 rounded-lg shadow-md border-2 border-indigo-500 w-96"
        onSubmit={handleSignIn}
      >
        <h2 className="text-2xl font-bold text-center text-neon-purple mb-4">🔹 Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 border border-neon-pink text-neon-green placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-800 border border-neon-pink text-neon-green placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            checkPasswordStrength(e.target.value);
          }}
          className="w-full p-2 mb-2 bg-gray-800 border border-neon-pink text-neon-green placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-blue"
          required
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`mb-3 text-sm text-center ${passwordStrength.includes("Weak") ? "text-red-400" : passwordStrength.includes("Medium") ? "text-yellow-400" : "text-green-400"} animate-pulse`}
        >
          {passwordStrength}
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0, 255, 255, 0.8)" }} 
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-neon-blue text-black p-2 rounded-md font-bold transition-transform"
        >
          🚀 Sign In
        </motion.button>
      </motion.form>
    </div>
  );
};

export default SignInPage;
