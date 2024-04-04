import { fetchAllBooks, fetchBookByID } from "../../fetchdata";
import { useState, useEffect } from "react";
import styles from "./Book_Page.module.css";
import StarRate from "../../Components/starRate/starRate";
import { useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function Book_Page() {
  const [book, setBook] = useState({});

  const { bookID } = useParams();

  useEffect(() => {
    getBookId();
  }, []);

  function getBookId() {
    fetchBookByID(bookID)
      .then((book) => {
        setBook(book);
      })
      .catch((error) => {
        console.error("Error fetching or processing books:", error);
      });
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.book_image_div}>
          <img className={styles.book_image} clas src={book.thumbnailUrl} />
        </div>
        <div className={styles.book_info}>
          <div className={styles.book_info_title}>{book.title}</div>
          <div className={styles.book_info_authors}>
            de {book?.authors ? `de ${book.authors.join(", ")}` : ""}
          </div>
          <p className={styles.status}>{book.status}</p>
          <div className={styles.star_score}>
            <StarRate stars={book.score} size={30} />
          </div>
          <div className={styles.book_info_button_div}>
            <div className={styles.price_row}>
              <p className={styles.book_info_price}>
                {book.price ? `${book.price}€` : "Não Disponivel"}
              </p>
              <button className={styles.info_button}>i</button>
            </div>
            <button className={styles.book_info_button}>
              <span>Adicionar ao Carrinho</span>
            </button>
          </div>
          <div className={styles.sinopse_div}>
            <p className={styles.sinopse_title}>Sinopse</p>
            <p className={styles.sinopse_text}>{book.longDescription}</p>
          </div>
          <div className={styles.details_div}>
            <p className={styles.details_title}>Detalhes do Produto</p>
            <p className={styles.details_title_book}>Título: {book.title}</p>
            <p className={styles.details_authors}>
              {book?.authors ? `Autor(es): ${book.authors.join(", ")}` : ""}
            </p>
            <p className={styles.details_categories}>
              {book?.authors
                ? `Categoria(s): ${book.categories.join(", ")}`
                : ""}
            </p>
            <p>
              {book.publishedDate && (
                <p>
                  Data de Publicação:{" "}
                  {new Date(book.publishedDate.$date).toLocaleDateString()}
                </p>
              )}
            </p>
            <p className={styles.details_isbn}>ISBN: {book.isbn}</p>
            <p className={styles.details_pages}>
              Páginas: <span className={styles.bold}>{book.pageCount}</span>
            </p>
            <p className={styles.details_score}>
              Score: {<StarRate stars={book.score} size={12} />}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
