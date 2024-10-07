import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const API_KEY = "5a6b5599d4c44f6f3939766ca5724cc3";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
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

  if (error) return <p>Error loading movie details.</p>;

  return (
    movie && (
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
        <MovieCast movieId={movieId} />
        <MovieReviews movieId={movieId} />
      </div>
    )
  );
};

export default MovieDetailsPage;
