import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  Outlet,
  NavLink,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const API_KEY = "5a6b5599d4c44f6f3939766ca5724cc3";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (error) return <p>Помилка завантаження деталей фільму.</p>;

  return (
    movie && (
      <div>
        <button
          className={styles.backButton}
          onClick={() => navigate(backLink.current)}
        >
          Назад
        </button>
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>

        <nav>
          <NavLink to="cast">Каст</NavLink>
          <NavLink to="reviews">Рецензії</NavLink>
        </nav>

        <Outlet />
      </div>
    )
  );
};

export default MovieDetailsPage;
