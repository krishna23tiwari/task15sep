import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const [formdata, setfromdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [editId, seteditId] = useState(null);
  const [Allusers, setAllusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navi = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navi("/login");
    } else {
      fetchAllusers();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfromdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        
        const res = await axios.put(
          `http://localhost:5050/user/update/${editId}`,
          formdata,
          getAuthHeaders()
        );
        alert(res.data.message);
        fetchAllusers();
        seteditId(null);
      } else {
        alert("Select a user to edit first.");
      }

      
      setfromdata({ name: "", email: "", password: "", phone: "" });
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const fetchAllusers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5050/user/getall",
        getAuthHeaders()
      );
      setAllusers(res.data.users);
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (user) => {
    setfromdata({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
    });
    seteditId(user._id);
  };

  const handleDelete = async (user) => {
    try {
      const res = await axios.delete(
        `http://localhost:5050/user/delete/${user._id}`,
        getAuthHeaders()
      );
      alert(res.data.message);
      fetchAllusers();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navi("/login");
  };

  const filteredUsers = Allusers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
    
  
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 space-y-3"
      >
        <h2 className="text-lg font-semibold">Edit User</h2>

        <input
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={formdata.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        <input
          type="phone"
          name="phone"
          value={formdata.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-400 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
   
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

     
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">All Users</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.email}</td>
                  <td className="p-2 border">{item.phone}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-2 border">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
