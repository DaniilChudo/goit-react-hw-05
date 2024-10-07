import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: "5a6b5599d4c44f6f3939766ca5724cc3",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
