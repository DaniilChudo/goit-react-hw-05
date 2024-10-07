import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Сторінка не знайдена</h1>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
};

export default NotFoundPage;
