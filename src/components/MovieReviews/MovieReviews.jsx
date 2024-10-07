import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./MovieReviews.module.css";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTZiNTU5OWQ0YzQ0ZjZmMzkzOTc2NmNhNTcyNGNjMyIsIm5iZiI6MTcyODI5OTczNC44MzIzOTYsInN1YiI6IjY3MDNiZjU4NGNmNDdjNzMwZjczZTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iRxoF9vmBhhBBg-A_7yicYgxmRe2rw5NiPkXY9KpeRk";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              accept: "application/json",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        setError("Error fetching movie reviews");
        console.error(error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.reviewsContainer}>
      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.reviewAuthor}>{review.author}</h3>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
