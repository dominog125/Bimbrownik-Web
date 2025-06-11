import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberme, setRememberme] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/register");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            var loginurl = rememberme ? "/login?useCookies=true" : "/login?useSessionCookies=true";
            fetch('/api/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // handle success
                    console.log(data);
                    if (data.jwtToken) {
                        // Store the JWT token in localStorage
                        localStorage.setItem('jwtToken', data.jwtToken);
                        setError("Successful Login.");
                        window.location.href = '/';
                    } else {
                        setError("Error Logging In.");
                    }
                })
                .catch((error) => {
                    // handle error
                    console.error(error);
                    setError("Error Logging in.");
                });
        }
    };

    const token = localStorage.getItem('jwtToken');
    fetch('/api/SomeProtectedRoute', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        // ...other headers
      }
    });
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md border-4 border-orange-500">
                <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white-700 mb-1" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-white-700 mb-1" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-white-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberme"
                            name="rememberme"
                            checked={rememberme}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="rememberme" className="text-white-700">Remember Me</label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login</button>
                        <button onClick={handleRegisterClick} className="bg-gray-200 text-white-700 py-2 rounded hover:bg-gray-300 transition">Register</button>
                    </div>
                </form>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}

export default Login;