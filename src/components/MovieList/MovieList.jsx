import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
