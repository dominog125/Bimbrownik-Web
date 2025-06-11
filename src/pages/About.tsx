import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import CreatePost from '../Components/CreatePost';

type Post = {
  id: string;
  name: string;
  description: string;
  author: string;
  title: string;
  alcoholCategoryId: string;
};

type AlcoholCategory = {
  id: string;
  name: string;
};

const About: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [categories, setCategories] = useState<AlcoholCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const isLoggedIn = !!localStorage.getItem('jwtToken');

  // Fetch posts
  useEffect(() => {
    fetch('/api/Posts')
      .then((res) => {
        if (!res.ok) throw new Error('Błąd podczas pobierania danych');
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Fetch alcohol categories
  useEffect(() => {
    fetch("https://app-bimbrownik-eupl-dev-001-drdmbud9b2fvfqe8.canadacentral-01.azurewebsites.net/api/AlcoholCategories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  // Fetch favorites from API when logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      setFavoritesLoading(false);
      return;
    }
    const token = localStorage.getItem("jwtToken");
    setFavoritesLoading(true);
    fetch("/api/Favorites", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setFavorites(data.map((fav: { postId: string }) => fav.postId)))
      .catch(() => setFavorites([]))
      .finally(() => setFavoritesLoading(false));
  }, [isLoggedIn]);

  // Filter posts by search and selected category
  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase())) &&
          (selectedCategory === "" || item.alcoholCategoryId === selectedCategory)
      )
    );
  }, [search, data, selectedCategory]);

  // Add to favorites
  const handleAddFavorite = async (postId: string) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch("/api/Favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ postId }),
      });
      if (response.ok) {
        // Re-fetch favorites from API to ensure sync
        fetch("/api/Favorites", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => setFavorites(data.map((fav: { postId: string }) => fav.postId)))
          .catch(() => setFavorites([]));
      } else {
        const errorText = await response.text();
        console.error("Failed to add favorite:", errorText);
      }
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  if (loading || favoritesLoading) {
    return <div className="text-center text-gray-500 mt-4">Ładowanie postów...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Błąd: {error}</div>;
  }

  return (
    <div className="relative">
      {/* Searchbar & Category Dropdown */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Szukaj postów..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black text-white"
        />
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded border border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black text-white"
        >
          <option value="">Wszystkie kategorie</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        
        {isLoggedIn && (
          <div className="hidden sm:block">
            <Link
              to="/create-post"
              className="bg-black  border-2 border-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Dodaj post
            </Link>
          </div>
        )}
      </div>
      
      {isLoggedIn && (
        <div className="block sm:hidden mb-4 flex justify-center">
          <Link
            to="/create-post"
            className="bg-[#242424] border-2 border-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Dodaj post
          </Link>
        </div>
      )}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item) => {
          const isFavorite = favorites.includes(item.id);
          const category = categories.find(cat => cat.id === item.alcoholCategoryId);
          return (
            <div
              key={item.id}
              className="bg-black shadow-md rounded-xl p-4 border border-orange-500 hover:shadow-lg transition duration-300"
            >
              <strong>Tytuł: </strong>
              <Link to={`/post/${item.id}`}>{item.title}</Link>
              <h2 className="text-xl font-semibold text-white-600 mb-2">{item.name}</h2>
              <p className="text-white-700 mb-1">{item.description}</p>
              <p className="text-sm text-white-500">
                <strong>Autor: </strong> {item.author}
              </p>
              <p className="text-sm text-white-500">
                <strong>Kategoria alkoholu: </strong> {category ? category.name : "Nieznana"}
              </p>
              {isLoggedIn && (
                isFavorite ? (
                  <span className="inline-block mt-2 px-3 py-1 rounded bg-orange-400 text-white transition">
                    Ulubione
                  </span>
                ) : (
                  <button
                    className="mt-2 px-3 py-1 rounded bg-gray-700 text-white-400 hover:bg-orange-500 hover:text-white transition"
                    onClick={() => handleAddFavorite(item.id)}
                  >
                    Dodaj do ulubionych
                  </button>
                )
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;