import './App.css'
import { useState,useRef,useEffect } from 'react';
function App() {
const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const currentPage = useRef(1);
  const todosPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);
    const fetchapi = async () => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
      const data = await res.json();
      setTodos(data);
      setTotalPages(Math.ceil(data.length / todosPerPage));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };


  const updatePageData = (page) => {
    const startIndex = (page - 1) * todosPerPage;
    const endIndex = startIndex + todosPerPage;
    setCurrentTodos(todos.slice(startIndex, endIndex));
  };

  useEffect(() => {
    fetchapi();
  }, []);

  useEffect(() => {
    updatePageData(currentPage.current);
  }, [todos]);

   const handlePageChange = (page) => {
    currentPage.current = page;
    updatePageData(page);
  };

  const handlePrev = () => {
    if (currentPage.current > 1) {
      currentPage.current -= 1;
      updatePageData(currentPage.current);
    }
  };
  
const handleNext = () => {
    if (currentPage.current < totalPages) {
      currentPage.current += 1;
      updatePageData(currentPage.current);
    }
  };

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

      <ul className="space-y-2">
        {currentTodos.map((todo) => (
          <li
            key={todo.id}
            className="border px-4 py-2 rounded shadow-sm bg-white text-gray-800"
          >
            {todo.title}
          </li>
        ))}
      </ul>

    
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <button
          onClick={handlePrev}
          disabled={currentPage.current === 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 border rounded ${
                currentPage.current === pageNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage.current === totalPages}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
      
    </>
  )
}

export default App
