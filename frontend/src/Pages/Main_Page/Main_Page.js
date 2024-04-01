import styles from "./Main_Page.module.css";
import { fetchAllBooks, fetchBookByID } from "../../fetchdata";
import { useState, useEffect } from "react";

export default function Main_Page() {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    getTopBooks();
  }, []);

  function getTopBooks() {
    fetchAllBooks()
      .then((books) => {
        setTopBooks(books.filter((book) => book.score === 5));
      })
      .catch((error) => {
        console.error("Error fetching or processing books:", error);
      });
  }

  function renderTopBooks() {
    return topBooks.map((book) => (
      <div key={book.id} className={styles.slide}>
        <img src={book.thumbnailUrl} alt={book.title} />
      </div>
    ));
  }

  return (
    <>
      <div className={styles.initial_image}>
        <p className={styles.top_livros}>Top Livros</p>
      </div>
      <div className={styles.top_books}>
        <div className={styles.slider}>
          <div
            className={styles.slide_track}
            style={{ width: `calc(250px * ${topBooks.length} * 5)` }}
          >
            {renderTopBooks()}
            {renderTopBooks()}
          </div>
        </div>
      </div>
    </>
  );
}
