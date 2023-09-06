import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// step-1 : เก็บ Input จาก user => React state
// step-2 : handle จังหวะ submit
// step-3 : Make HTTP Request => Get Date
// step-4 : เอา Data มาแสดงผล

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDRhZDg0YTEzODRkMDRjNGY0YWVlMzZmNGE5YjE0OCIsInN1YiI6IjVlZWUwOTAwYjA0NjA1MDAzNDBlOTg2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H7gQK0dgqOvsQmsHsgtOmsqKVFmnb1urXF3q9AkqyCE";
function App() {
  const [keyword, setKeyword] = useState("");
  const [movieLists, setMovieLists] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let url = `${BASE_URL}/search/keyword?query=${keyword}&page=1`;
    let option = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, option);
      const data = await response.json();
      console.log(data);
      setMovieLists(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = () => {
    setTotalPage();
  };
  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>Movie App</h1>
      </div>
      {/* Input */}
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="keyword?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      <div className="button-page">
        {Array.from(Array(totalPage).keys()).map((n) => (
          <button onClick={changePage}>{n + 1}</button>
        ))}
      </div>
      {/* Result */}
      <div className="movie-lists">
        {movieLists.map((movie) => (
          <div key={movie.id} className="movie">
            {movie.name}
          </div>
        ))}
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
