import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-2xl border-4 border-orange-500">
        <h1 className="text-4xl font-bold mb-6 text-center text-orange-500">
          Bimbrownik
        </h1>
        <p className="text-lg text-gray-200 text-center mb-4">
          Bimbrownik to aplikacja społecznościowa dla pasjonatów domowych trunków.
          Pozwala dzielić się przepisami, doświadczeniami oraz opiniami na temat
          wyrobów alkoholowych. Dołącz do społeczności, komentuj, oceniaj i
          poznawaj nowe inspiracje!
        </p>
      </div>
    </div>
  );
};

export default Home;