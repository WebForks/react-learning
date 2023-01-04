import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?apikey=2897691b';

const App = () => {
  const handleKeyDown = event => {
   if (event.key === "Enter") {
      searchMovies(searchTerm)
   }
  }
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("spiderman");
    // return () => {
    //     cleanup
    // }
  }, []);

  return (

    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies.."
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
          onKeyDown={handleKeyDown}
        />
        <img src={SearchIcon} alt="search-icon" onClick={() => searchMovies(searchTerm)} />
      </div>

      {
        movies?.length > 0 
        ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}

        </div>

        ) : (
            <div className="empty">
            <h2>Movies not found</h2>
            </div>
        )
      }

    </div>
  );
};

export default App;