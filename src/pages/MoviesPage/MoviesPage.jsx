import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const API_KEY = "5a6b5599d4c44f6f3939766ca5724cc3";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    setQuery(queryParam);
    const fetchMovies = async () => {
      if (queryParam) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${queryParam}&api_key=${API_KEY}`
        );
        setMovies(response.data.results);
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div className={styles.movies}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
