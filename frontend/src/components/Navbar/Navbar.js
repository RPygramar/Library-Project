import styles from "./Navbar.module.css";
import logo from "../../assets/colares_sintra_logo.png";
import React, { useState, useContext, useEffect } from "react";
import {NavLink, useLocation} from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "../../App";
import { FaSearch } from "react-icons/fa";
import {fetchAllBooks} from "../../fetchdata";
import AsyncSelect from "react-select/async";
import { components, DropdownIndicatorProps } from 'react-select';
import { useNavigate } from 'react-router-dom';



export default function Navbar() {

  const { cart, setCart, atualizarContext } = useContext(CartContext);

  const [allAuthorsCategories, setAllAuthorsCategories] = useState([]);

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [titles, setTitles] = useState([]);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const fetchData = async () => {
    try {
      const fetchAllBooksData = await fetchAllBooks();

      const extractedAuthors = fetchAllBooksData.flatMap((book) =>
        book.authors ? book.authors.map(author => ({ value: author, type: 'Author' })) : []
      );
      const uniqueAuthors = [...new Set(extractedAuthors)];

      const extractedTitles = fetchAllBooksData.flatMap((book) =>
        book.title ? [{ value: book.title, type: 'Title' }] : []
      );
      const uniqueTitles = [...new Set(extractedTitles)];

      const extractedCategories = fetchAllBooksData.flatMap((book) =>
        book.categories ? book.categories.map(category => ({ value: category, type: 'Category' })) : []
      );
      const uniqueCategories = [...new Set(extractedCategories)];

      // Concatenate uniqueAuthors, uniqueTitles, and uniqueCategories
      const concatenatedArray = [...uniqueAuthors, ...uniqueTitles, ...uniqueCategories];

      // Format the concatenated array
      const formatted = concatenatedArray.map((option) => ({ value: option.value, label: option.value, type: option.type }));

      setAuthors(uniqueAuthors.map(author => author.value));
      setCategories(uniqueCategories.map(category => category.value));
      setTitles(uniqueTitles.map(title => title.value));

      // Update the state
      setAllAuthorsCategories(formatted);
    } catch (error) {
      console.error('Error fetching data:', error);
   }
  }

  const loadAllOptions = async (searchValue, callback) => {
    await fetchData().then(
        () => {
            const filteredOptions = allAuthorsCategories.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            callback(filteredOptions);
        }
        );
  };


  const DropdownIndicator = (
  props: DropdownIndicatorProps< true>
  ) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaSearch label="search"  />
    </components.DropdownIndicator>
  );
};
  const handleChange = async (selectedOption) => {
    if(selectedOption === null){
      navigate(`/livros`);
      return;
    }
    if (selectedOption.type === 'Author') {
      navigate(`/livros?authors=${selectedOption.value}`);
    }
    if (selectedOption.type === 'Category') {
      navigate(`/livros?categories=${selectedOption.value}`);
    }
    if (selectedOption.type === 'Title') {
      navigate(`/livros?title=${selectedOption.value}`);
    }
  };


  return (
    <>
      <nav className={styles.navbarcomp}>
        <div className={styles.leftside}>
          <img className={styles.image} src={logo}></img>
          <AsyncSelect className={styles.select} loadOptions={loadAllOptions} defaultOptions isClearable
                       placeholder="Pesquisar..." name="author" defaultValue="Filtrar" onChange={handleChange}
                       components={{DropdownIndicator}}/>

        </div>
        <div className={styles.menu} onClick={() => {setIsOpen(!isOpen)}}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={isOpen ? styles.open : ""}>

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/livros">Livros</NavLink>
          </li>
          <li>
            <NavLink to="#">Contact</NavLink>
          </li>

          <li className={styles.bookcart}>
            <NavLink to="/carrinho">
              <AiOutlineShoppingCart size={25}/>
              <span className={styles.cart_num}>
                {cart.length > 9 ? "9+" : cart.length}
              </span>
            </NavLink>
          </li>

        </ul>

      </nav>


      {/*<header className={styles.header}>*/}

      {/*  <div className={styles.inputWrapper}>*/}
      {/*    <img className={styles.image} src={logo}></img>*/}
      {/*    <AsyncSelect className={styles.select} loadOptions={loadOptionsCategorys} defaultOptions isClearable*/}
      {/*                 placeholder="Pesquisar..." name="author" defaultValue="Filtrar" onChange={handleChange}*/}
      {/*                 components={{DropdownIndicator}}/>*/}

      {/*  </div>*/}
      {/*  <ul className={styles.ulclass}>*/}
      {/*    <li>*/}
      {/*      <NavLink to="/">Home</NavLink>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <NavLink to="/livros">Livros</NavLink>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <NavLink to="#">Services</NavLink>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <NavLink to="#">Contact</NavLink>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <NavLink to="/carrinho">*/}
      {/*        <AiOutlineShoppingCart size={25}/>*/}
      {/*        <span className={styles.cart_num}>*/}
      {/*          {cart.length > 9 ? "9+" : cart.length}*/}
      {/*        </span>*/}
      {/*      </NavLink>*/}
      {/*    </li>*/}
      {/*    <div className={styles.menu}>*/}
      {/*      <span></span>*/}
      {/*      <span></span>*/}
      {/*      <span></span>*/}
      {/*    </div>*/}
      {/*  </ul>*/}
      {/*</header>*/}
    </>
  );
}
