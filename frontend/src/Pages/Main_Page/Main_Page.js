import styles from "./Main_Page.module.css";
import { fetchAllBooks, fetchBookByID } from "../../fetchdata";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book_Page from "../Book_Page/Book_Page";

export default function Main_Page() {
  const [topBooks, setTopBooks] = useState([]);

  const colors = {
    1: "rgba(229,174,205,255)",
    2: "rgba(134,208,222,255)",
    3: "rgba(251,174,174,255)",
    4: "rgba(0,240,97,255)",
    5: "rgba(251,93,82,255)",
    6: "rgba(227,55,123,255)",
    7: "rgba(0,169,193,255)",
    8: "rgba(177,72,217,255)",
    9: "rgba(250,76,85,255)",
  };

  let color_index = 0;

  const getColor = () => {
    if (color_index >= 10) {
      color_index = 0;
    }
    color_index += 1;
    return colors[color_index];
  };

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
        <div
          className={styles.topBooksInformation}
          style={{ backgroundColor: getColor() }}
        >
          <img src={book.thumbnailUrl} alt={book.title} />
          <div className={styles.topBookInfo}>
            <h3>{book.title}</h3>
            <p className={styles.authors}>de {book.authors.join(", ")}</p>
            <p className={styles.shortDescription}>{book.shortDescription}</p>
            <Link to={`livro/${book.id}`}>
              <button className={styles.checkBookButton}>Ver o Livro</button>
            </Link>
          </div>
        </div>
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
            style={{ width: `calc(400px * ${topBooks.length} * 2)` }}
          >
            {renderTopBooks()}
            {renderTopBooks()}
          </div>
        </div>
      </div>
      <div className={styles.main_divider}></div>
    </>
  );
}
