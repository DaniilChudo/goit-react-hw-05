import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./MovieCast.module.css";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTZiNTU5OWQ0YzQ0ZjZmMzkzOTc2NmNhNTcyNGNjMyIsIm5iZiI6MTcyODI5OTczNC44MzIzOTYsInN1YiI6IjY3MDNiZjU4NGNmNDdjNzMwZjczZTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRxoF9vmBhhBBg-A_7yicYgxmRe2rw5NiPkXY9KpeRk";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        setError("Error fetching movie cast");
        console.error(error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.castContainer}>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className={styles.actorImage}
            />
            <p>{actor.name}</p>
            <p className={styles.characterName}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
