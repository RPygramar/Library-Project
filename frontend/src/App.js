import "./App.css";
import Main_Page from "./Pages/Main_Page/Main_Page";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book_Page from "./Pages/Book_Page/Book_Page";
import BooksPage from "./Pages/BooksPage/BooksPage";
import Cart_Page from "./Pages/Cart_Page/Cart_Page";
import Footer from "./components/Footer/Footer";
import { useState, createContext } from "react";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  function atualizarContext(book) {
    setCart((prevCart) => {
      return [...prevCart, book];
    });
    console.log(cart.length);
  }

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, atualizarContext }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main_Page />} />
            <Route path="/livro/:bookID" element={<Book_Page />} />

            <Route path="/livros" element={<BooksPage />} />
            <Route path="/carrinho" element={<Cart_Page />} />
          </Routes>
        </Router>
      </CartContext.Provider>
      <Footer />
    </>
  );
}

export default App;
