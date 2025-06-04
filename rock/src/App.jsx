import React, { useEffect, useState, useRef } from 'react';

import './App.css'

function App() {
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentPage = useRef(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchapi = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setData(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchapi(currentPage.current);
  }, []);

  const handlePageClick = (page) => {
    currentPage.current = page;
    fetchapi(page);
  };


  return (
    <>
      
       <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Rick and Morty Characters</h1>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.map((char) => (
          <div key={char.id} className="bg-white shadow rounded p-3 text-center">
            <img src={char.image} alt={char.name} className="w-full h-40 object-cover rounded" />
            <h2 className="mt-2 font-semibold">{char.name}</h2>
            <p className="text-sm text-gray-600">{char.species}</p>
          </div>
        ))}
      </div>

    
      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 rounded border ${
                currentPage.current === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
    </>
  )
}

export default App
