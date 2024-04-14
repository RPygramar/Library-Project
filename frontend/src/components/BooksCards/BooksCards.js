import Styles from "./BooksCards.module.css";
import currency from "../../assets/icons/currency-eur.png";
import basket from "../../assets/icons/shopping-basket.png";
import { BsCartPlus } from "react-icons/bs";
import { useState, useContext } from "react";
import { CartContext } from "../../App";
import { NavLink } from "react-router-dom";

export default function BooksCards({
  book,
  bookid,
  bookURL,
  bookTitle,
  bookAuthor,
  bookPrice,
}) {
  const { cart, setCart, atualizarContext } = useContext(CartContext);
  return (
    <>
      <div className={Styles.card}>
        <div className={Styles.bookLeftSide}>
          <img src={bookURL} alt="Book Image not Found" />
        </div>
        <div className={Styles.bookRightSide}>
          <div className={Styles.bookDescription}>
            <NavLink style={{ textDecoration: "none" }} to={`/livro/${bookid}`}>
              <h2 className={Styles.link}>{bookTitle}</h2>
            </NavLink>
            <div className={Styles.author}>
              <a>{bookAuthor}</a>
              <p>
                <span>Em stock</span>
              </p>
            </div>
          </div>
          <div className={Styles.bookPrice}>
            <h1>
              {bookPrice === "undefined"
                ? "Sob consulta"
                : parseFloat(bookPrice).toFixed(2) + "€"}{" "}
            </h1>
            <button onClick={() => atualizarContext(book)}>
              <BsCartPlus size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
