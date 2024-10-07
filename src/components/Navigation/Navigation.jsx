import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
    </nav>
  );
};

export default Navigation;
