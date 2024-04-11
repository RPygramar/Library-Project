import { fetchAllBooks, fetchBookByID } from "../../fetchdata";
import { useState, useEffect, useContext } from "react";
import StarRate from "../../components/starRate/starRate";
import { useParams } from "react-router-dom";
import styles from "./Cart_Page.module.css";
import { BsCart } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../App";

export default function Book_Page() {
  const { cart, setCart, atualizarContext } = useContext(CartContext);
  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_up}>
          <h2 className={styles.title}>O meu carrinho</h2>
          <p className={styles.n_artigos}>{0} artigos</p>
        </div>
        <div className={styles.container_bottom}>
          <div className={styles.product_box}>
            <BsCart className={styles.custom_icon} color="#b3b3b3" />
            <p className={styles.empty_cart}>Carrinho Vazio</p>
            <p className={styles.empty_cart}>
              <span>
                Explora a diversidade de livros que temos para oferecer
              </span>
            </p>
          </div>
          <div className={styles.bottom_right_container}>
            <div className={styles.total_container}>
              <p className={styles.total_label}>Total</p>
              <p className={styles.total_price}>10,00€</p>
            </div>
            <div className={styles.buy_button}>
              <BsCartPlus className={styles.cart_plus} />
              <p className={styles.buy_label}>COMPRAR</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
