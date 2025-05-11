import React, {useEffect, useState} from 'react';

type Post = {
  id: string;
  name: string;
  description: string;
  author: string;
  title: string;
};

const About: React.FC = () => {
    const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div className="text-center text-gray-500 mt-4">Ładowanie postów...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">Błąd: {error}</div>;
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-black shadow-md rounded-xl p-4 border border-orange-500 hover:shadow-lg transition duration-300"
        >
          <h2 className="text-xl font-semibold text-white-600 mb-2">{item.name}</h2>
          <p className="text-white-700 mb-1">{item.description}</p>
          <p className="text-sm text-white-500">
            <strong>Autor:</strong> {item.author}
          </p>
          <p className="text-sm text-white-500">
            <strong>Tytuł:</strong> {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default About;