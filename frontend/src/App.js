import "./App.css";
import Main_Page from "./Pages/Main_Page/Main_Page";
import Navbar from "./Components/Navbar/Navbar";
import { fetchAllBooks, fetchBookByID } from "./fetchdata";

function App() {
  return (
    <>
      <Navbar />
      <Main_Page />
      {fetchAllBooks()}
      {fetchBookByID(2)}
    </>
  );
}

export default App;
