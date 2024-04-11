import "./App.css";
import Main_Page from "./Pages/Main_Page/Main_Page";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book_Page from "./Pages/Book_Page/Book_Page";
import BooksPage from "./Pages/BooksPage/BooksPage";
import Cart_Page from "./Pages/Cart_Page/Cart_Page";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main_Page />} />
          <Route path="/livro">
            <Route path="/livro/:bookID" element={<Book_Page />}></Route>
          </Route>
          <Route path="/livros" element={<BooksPage />} />
          <Route path="/carrinho" element={<Cart_Page />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
