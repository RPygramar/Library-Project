import styles from "./Navbar.module.css";
import logo from "../../assets/colares_sintra_logo.png";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <img className={styles.image} src={logo} onClick={handleChange}></img>
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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/livros">Livros</NavLink>
          </li>
          <li>
            <NavLink to="#">Services</NavLink>
          </li>
          <li>
            <NavLink to="#">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/carrinho">
              <AiOutlineShoppingCart size={25} />
            </NavLink>
          </li>
        </ul>
      </header>
    </>
  );
}
