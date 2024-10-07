import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const API_KEY = "5a6b5599d4c44f6f3939766ca5724cc3";
const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
