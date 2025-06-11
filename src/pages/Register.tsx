import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultRoles = ["user"];

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "username") setUsername(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            fetch("/api/Auth/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    roles: defaultRoles,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        setSuccess("Registration successful!");
                        setTimeout(() => navigate("/login"), 1000);
                    } else {
                        setError("Error registering.");
                    }
                })
                .catch((error) => {
                    setError("Error registering.");
                });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md border-4 border-orange-500">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Register</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-300 mb-1">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-300 mb-1">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-300 mb-1">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-300 mb-1">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">Register</button>
                        <button onClick={handleLoginClick} className="bg-gray-200 text-white-700 py-2 rounded hover:bg-gray-300 transition">Go to Login</button>
                    </div>
                </form>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
            </div>
        </div>
    );
}

export default Register;