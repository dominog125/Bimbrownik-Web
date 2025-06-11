import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  name: string;
  description: string;
  author: string;
  title: string;
};

const Favorites: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    fetch("/api/Favorites", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveFavorite = async (postId: string) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await fetch(`/api/Favorites/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        const errorText = await response.text();
        console.error("Failed to remove favorite:", errorText);
      }
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400 mt-8">Ładowanie ulubionych postów...</div>;
  }

  if (!posts.length) {
    return <div className="text-center text-gray-400 mt-8">Brak ulubionych postów.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#242424] min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-White-500">Ulubione posty</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map(post => (
          <div key={post.id} className="bg-black shadow-md rounded-xl p-4 border border-orange-500">
            <h3 className="text-xl text-white mb-2">
              <Link to={`/post/${post.id}`} className="hover:underline text-orange-400">
                {post.name}
              </Link>
            </h3>
            <p className="text-gray-300 mb-1">{post.description}</p>
          
            <p className="text-sm text-gray-400">
              <strong>Tytuł:</strong> {post.title}
            </p>
            <button
              onClick={() => handleRemoveFavorite(post.id)}
              className="mt-3 px-3 py-1 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
            >
              Usuń z ulubionych
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;