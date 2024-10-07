import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: "5a6b5599d4c44f6f3939766ca5724cc3",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.id}>{actor.name}</li>
      ))}
    </ul>
  );
};

export default MovieCast;
