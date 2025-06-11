import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AlcoholCategory = {
    id: string;
    name: string;
};

const CreatePost: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [alcoholCategoryId, setAlcoholCategoryId] = useState("");
    const [categories, setCategories] = useState<AlcoholCategory[]>([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://app-bimbrownik-eupl-dev-001-drdmbud9b2fvfqe8.canadacentral-01.azurewebsites.net/api/AlcoholCategories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => setError("Failed to load categories"));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name || !description || !title || !alcoholCategoryId) {
            setError("Please fill in all fields.");
            return;
        }

        const token = localStorage.getItem("jwtToken");

        try {
            const response = await fetch("/api/Posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    description,
                    title,
                    alcoholCategoryId,
                }),
            });

            if (response.ok) {
                setSuccess("Post created successfully!");
                setName("");
                setDescription("");
                setTitle("");
                setAlcoholCategoryId("");
                setTimeout(() => {
                    navigate("/about");
                }, 1000);
            } else {
                setError("Failed to create post.");
            }
        } catch (err) {
            setError("An error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md border-4 border-orange-500">
                <h3 className="text-2xl font-bold mb-6 text-center text-white">Utwórz Post</h3>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="title">Tytul:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="name">Skladniki:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="description">Opis:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1" htmlFor="alcoholCategoryId">Kategoria Alkoholu:</label>
                        <select
                            id="alcoholCategoryId"
                            name="alcoholCategoryId"
                            value={alcoholCategoryId}
                            onChange={e => setAlcoholCategoryId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-black text-white"
                        >
                            <option value="">Wybierz Kategorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition w-full"
                    >
                        Utwórz Post
                    </button>
                </form>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
            </div>
        </div>
    );
};

export default CreatePost;