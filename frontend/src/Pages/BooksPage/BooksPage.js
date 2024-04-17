import BooksCards from "../../components/BooksCards/BooksCards";
import {
  fetchAllBooks, randomSearch, retrieveBooksByAuthorOrCat,
} from "../../fetchdata";
import React, {useState, useEffect} from "react";
import Styles from "./BooksPage.module.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import ReactPaginate from "react-paginate";
import {useLocation} from "react-router-dom";


export default function BooksPage() {
  const [authors, setAuthors] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);


  const [books, setBooks] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const location = useLocation();
  let category = new URLSearchParams(location.search).get("categories");
  let author = new URLSearchParams(location.search).get("authors");
  let title = new URLSearchParams(location.search).get("title");






    const filterBooks = async (selectedAuthorss, selectedCategoriess, selectedSort, currentPage) => {
        let order = null;
        let target = null;

        switch (selectedSort) {
          case "Preço (mais baixo)":
            order = "ASC";
            target = "price";
            break;
          case "Preço (mais alto)":
            order = "DESC";
            target = "price";
            break;
          case "Pontuação (mais alto)":
            order = "DESC";
            target = "score";
            break;
          case "Pontuação (mais baixa)":
            order = "ASC";
            target = "score";
            break;
        }

        const filteredBooks = await retrieveBooksByAuthorOrCat(selectedAuthorss, selectedCategoriess,target,order , currentPage);
        setBooks(filteredBooks[0]);
        setTotalPages(filteredBooks[1]);

  };


  const fetchData = async () => {
    try {
      const fetchAllBooksData = await fetchAllBooks();

      const extractedAuthors = fetchAllBooksData.flatMap((book) =>
        book.authors ? book.authors : []
      );
      const uniqueAuthors = [...new Set(extractedAuthors)];

      const extractedCategorys = fetchAllBooksData.flatMap((book) =>
        book.categories ? book.categories : []
      );
      const uniqueCategorys = [...new Set(extractedCategorys)];

      setAuthors(uniqueAuthors);
      setCategorys(uniqueCategorys);

      setIsDataLoaded(true); // Set data loaded to true after fetching data
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };


  const filteredFunction = (selectedAuthors, selectedCategories, querySort) => {

    setSelectedSort(querySort);
    setSelectedCategories(selectedCategories);
    setSelectedAuthors(selectedAuthors);

    filterBooks(selectedAuthors, selectedCategories, querySort, currentPage);
  }

  const searchByTitle = async (title) => {
    const filteredBookss = await randomSearch(title);
    console.log(filteredBookss);
    setBooks(filteredBookss);
  }


  useEffect(() => {
    console.log("Being called")

      category = new URLSearchParams(location.search).get("categories");
      author = new URLSearchParams(location.search).get("authors");
      title = new URLSearchParams(location.search).get("title");

      fetchData()
      if(authors !==null){
        filterBooks([author], selectedCategories, selectedSort, currentPage)
      }
      if (category !==null){
        filterBooks(selectedAuthors, [category], selectedSort, currentPage)
      }
      if (title !==null){
        console.log("searching by title")
        searchByTitle(title)
      }
      if(category ===null && author == null && title === null){
        filterBooks(selectedAuthors, selectedCategories, selectedSort, currentPage)
      }

  }, [currentPage, author, category, title]); // Run fetchData whenever the currentPage changes

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage); // Update currentPage state
  };

  return (
    <>
      {isDataLoaded && (
        <FilterBar
          authors={authors}
          categorys={categorys}
          filteredFunction={filteredFunction}
        />
      )}
      <ul className={Styles.booksContainer}>
        {books &&
          books.length > 0 &&
          books.map((book, index) => (
            <li key={index} className={Styles.bookItem}>
              <BooksCards
                book={book}
                bookid={book.id}
                bookURL={book.thumbnailUrl}
                bookTitle={book.title}
                bookAuthor={
                  book.authors ? book.authors.join(", ") : "Unknown Author"
                }
                bookPrice={`${book.price}`}
              />
            </li>
          ))}
      </ul>
      <div>
        <ReactPaginate
          previousLabel={"< Anterior"}
          nextLabel={"Próximo >"}
          breakLabel={"..."}
          pageCount={totalPages}
          onPageChange={handlePageClick}
          containerClassName={Styles.pagination}
          pageLinkClassName={Styles.pageNum}
          pageItemClassName={Styles.pageNum}
          previousLinkClassName={Styles.pageNum}
          nextLinkClassName={Styles.pageNum}
          activeClassName={Styles.active}
        />
      </div>
    </>
  );
}
