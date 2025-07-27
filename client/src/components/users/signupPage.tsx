import { useState } from "react";
import { registerUser } from "../../api/requests/userApi"; 

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    dateOfBirth: "",
    language: "",
    gender: "",
    profilePhoto: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await registerUser(formData);
      console.log("Signup success:", response);
      // TODO: redirect to home page after success
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-yellow-400">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          <input
            name="profilePhoto"
            placeholder="Profile Photo URL"
            value={formData.profilePhoto}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
          />
          <input
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          />
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          >
            <option value="">Select Language</option>
            <option value="Hebrew">Hebrew</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Arabic">Arabic</option>
          </select>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-xl border-gray-300 shadow-sm focus:ring-purple-600 focus:border-purple-600"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-900 text-white py-2 px-4 rounded-xl transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-purple-800 underline">Login</a>
        </p>
      </div>
    </div>
  );
}
