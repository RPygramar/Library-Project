import { useState, useEffect, useContext } from "react";
import styles from "./Cart_Page.module.css";
import { BsCart } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../App";
import Product_Basket from "../../components/Product_Basket/Product_Basket";

export default function Book_Page() {
  const { cart, setCart } = useContext(CartContext);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    getTotalFromCart();
  }, [cart]);

  function updateProductQuantity(productId, quantityChange) {
    setCart((currentCart) => {
      return currentCart.map((item) => {
        if (item.id === productId) {
          // Ensure the quantity doesn't drop below 1
          const newQuantity = Math.max(1, item.quantity + quantityChange);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  }

  function getTotalFromCart() {
    let totalSum = 0;
    cart.forEach((element) => {
      totalSum += element.price * element.quantity;
    });
    setTotal(totalSum); // Update the `total` state
  }

  function loadComponents() {
    return cart.map((element) => (
      <Product_Basket
        key={element.id}
        product={element}
        onUpdateQuantity={updateProductQuantity}
      />
    ));
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_up}>
          <h2 className={styles.title}>O meu carrinho</h2>
          <p className={styles.n_artigos}>{cart.length} artigos</p>
        </div>
        <div className={styles.container_bottom}>
          {cart.length === 0 ? (
            <div className={styles.product_box}>
              <BsCart className={styles.custom_icon} color="#b3b3b3" />
              <p className={styles.empty_cart}>Carrinho Vazio</p>
              <p className={styles.empty_cart}>
                <span>
                  Explora a diversidade de livros que temos para oferecer
                </span>
              </p>
            </div>
          ) : (
            <div className={styles.products_container}>{loadComponents()}</div>
          )}
          <div className={styles.bottom_right_container}>
            <div className={styles.total_container}>
              <p className={styles.total_label}>Total</p>
              <p className={styles.total_price}>€ {total.toFixed(2)}</p>
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
