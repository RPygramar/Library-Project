import Styles from "./BooksCards.module.css";
import currency from "../../assets/icons/currency-eur.png";
import basket from "../../assets/icons/shopping-basket.png";
import { BsCartPlus } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../App";

export default function BooksCards({
  book,
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
            <h2>{bookTitle}</h2>
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
              <BsCartPlus size={35} color="#de5e35" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
