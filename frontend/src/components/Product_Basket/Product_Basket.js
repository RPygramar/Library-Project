import React, { useState, useContext } from "react";
import styles from "./Product_Basket.module.css";
import { CartContext } from "../../App";

export default function Product_Basket(props) {
  // Destructure both `product` and `onUpdateQuantity` from props
  const { product, onUpdateQuantity } = props;

  const { cart, setCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(product.quantity);

  function change_quantity(value) {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity); // Update local state to re-render this component
      onUpdateQuantity(product.id, value); // Notify parent component to update the cart
    }
  }

  function deleteProduct() {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    console.log(cart);
  }

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <img
          className={styles.product_image}
          src={product.thumbnailUrl}
          alt={product.title}
        />
        <div className={styles.left_right_container}>
          <p>{product.title}</p>
          <p className={styles.price}>
            {parseFloat(product.price).toFixed(2)}€
          </p>
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.units_container}>
          <p className={styles.units_style} onClick={() => change_quantity(-1)}>
            -
          </p>
          <p>{quantity}</p>
          <p className={styles.units_style} onClick={() => change_quantity(1)}>
            +
          </p>
        </div>
        <p onClick={() => deleteProduct()} className={styles.remove}>
          Remover
        </p>
      </div>
    </div>
  );
}
