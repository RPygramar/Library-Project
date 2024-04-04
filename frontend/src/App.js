import "./App.css";
import Main_Page from "./Pages/Main_Page/Main_Page";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Book_Page from "./Pages/Book_Page/Book_Page";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
