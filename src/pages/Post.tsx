import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Comment = {
  id: string;
  name: string;
  postId: string;
  authorId: string;
  authorUser: { username: string } | null;
};

type PostType = {
  id: string;
  name: string;
  description: string;
  title: string;
  author: string;
};

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/Posts/${id}`).then(res => res.json()),
      fetch(`/api/Comments?postId=${id}`).then(res => res.json())
    ])
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
      })
      .catch(() => setError("Failed to load post or comments"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("jwtToken");
    if (!commentContent) {
      setError("Comment cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: commentContent,
          postId: id
        }),
      });
      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setCommentContent("");
      } else {
        const errorText = await response.text();
        console.error("Failed to add comment:", errorText);
        setError("Failed to add comment.");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to add comment.");
    }
  };

  if (loading) return <div className="text-center text-gray-500 mt-4">Ładowanie...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;
  if (!post) return <div className="text-center text-gray-500 mt-4">Nie znaleziono posta.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-lg border-4 border-orange-500 mt-8">
      <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
      <h3 className="text-xl text-orange-400 mb-2">{post.name}</h3>
      <p className="text-gray-300 mb-4">{post.description}</p>
      <p className="text-sm text-gray-400 mb-6">Autor: {post.author}</p>
      <hr className="border-orange-500 mb-6" />
      <h4 className="text-xl text-white mb-4">Komentarze</h4>
      <div className="space-y-4 mb-6">
        {comments.length === 0 && <div className="text-gray-400">Brak komentarzy.</div>}
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-800 rounded p-3">
            <div className="text-gray-200">{comment.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              {comment.authorUser?.username
                ? comment.authorUser.username
                : "Anonimowy Alkoholik"}
            </div>
          </div>
        ))}
      </div>
      {localStorage.getItem("jwtToken") && (
        <form onSubmit={handleCommentSubmit} className="space-y-2">
          <textarea
            className="w-full px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 bg-black text-white"
            placeholder="Dodaj komentarz..."
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          >
            Dodaj komentarz
          </button>
        </form>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Post;