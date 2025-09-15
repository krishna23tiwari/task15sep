import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navi = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    logindata()
  }

  const logindata = async() => {
    try {
      const res = await axios.post(`http://localhost:5050/user/login`, {email,password})
      if(res.status === 200){
       alert(res.data.message)
        localStorage.setItem("token", res.data.token);
        setEmail("")
        setPassword("")
        
        navi('/Home')
      }
    } catch (error) {
        alert(error.response.data.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#1f1f2e] flex items-center justify-center p-4">
     
      <div className="w-full max-w-md bg-[#2a2a3b] text-white rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded bg-[#3a3a4f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded bg-[#3a3a4f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all"
            type="submit"
          >
            Login
          </button>

                    <Link
            to="/"
            className="text-blue-400 hover:underline font-medium"
          >
            Sign up
          </Link>

        </form>
      </div>
    </div>
  );
}
