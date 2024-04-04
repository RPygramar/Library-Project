import styles from "./Navbar.module.css";
import logo from "../../assets/colares_sintra_logo.png";
import React, { useState } from "react";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <img className={styles.image} src={logo}></img>
        <div className={styles.search_box}>
          <input
            type="search"
            placeholder="Pesquisar"
            value={searchInput}
            onChange={handleChange}
          ></input>
        </div>
        <ul className={styles.ulclass}>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="/livros">Livros</a>
          </li>
          <li>
            <a href="/carrinho">Carrinho</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </header>
    </>
  );
}
