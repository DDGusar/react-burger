import styles from "./notFound404.module.css";
import { Link } from "react-router-dom";
export const NotFound404 = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Oops! 404 Error</h1>
          <p>Такой страницы не существует</p>
          <br />
          <br />
          <p>
            проверьте адрес или попробуйте перейти на{" "}
            <Link to="/" className={styles.link}>
              стартовую страницу
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
