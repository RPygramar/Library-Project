import BooksCards from "../../components/BooksCards/BooksCards";
import {
  fetchAllBooks,
  fetchTenBooks,
  sortBooksByPrice,
} from "../../fetchdata";
import React, { useState, useEffect } from "react";
import Styles from "./BooksPage.module.css";
import FilterBar from "../../components/FilterBar/FilterBar";
import ReactPaginate from "react-paginate";
export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedSort, setSelectedSort] = useState(null);
  const [isBeingSorted, setIsBeingSorted] = useState(false);

  const fetchData = async () => {
    try {
      const fetchedBooks = await fetchTenBooks(currentPage);
      setBooks(fetchedBooks.data);

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
  const filterBooks = async (
    selectedAuthors,
    selectedCategories,
    selectedSort
  ) => {
    setSelectedSort(selectedSort);

    switch (selectedSort) {
      case "Preço (mais baixo)":
        setIsBeingSorted(true);
        const sortedBooks = await sortBooksByPrice("price", "asc", currentPage);
        setBooks(sortedBooks.data);
        break;
      case "Preço (mais alto)":
        setIsBeingSorted(true);
        const sortedBooksDesc = await sortBooksByPrice(
          "price",
          "desc",
          currentPage
        );
        setBooks(sortedBooksDesc.data);
        break;
      case "Pontuação (mais alto)":
        setIsBeingSorted(true);
        const sortedBooksScore = await sortBooksByPrice(
          "score",
          "desc",
          currentPage
        );
        setBooks(sortedBooksScore.data);
        break;
      case "Pontuação (mais baixa)":
        setIsBeingSorted(true);
        const sortedBooksScoreDesc = await sortBooksByPrice(
          "score",
          "asc",
          currentPage
        );
        setBooks(sortedBooksScoreDesc.data);
        break;
    }
  };

  useEffect(() => {
    console.log("Current page:", currentPage, "sortes:", isBeingSorted);
    if (isBeingSorted) {
      filterBooks([], [], selectedSort);
    } else {
      fetchData().then((r) => console.log("Data fetched", books.data));
    }
  }, [currentPage]); // Run fetchData whenever the currentPage changes

  const handlePageClick = (data) => {
    console.log(data.selected);
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage); // Update currentPage state
  };

  return (
    <>
      {isDataLoaded && (
        <FilterBar
          authors={authors}
          categorys={categorys}
          filterBooks={filterBooks}
        />
      )}
      <ul className={Styles.booksContainer}>
        {books &&
          books.length > 0 &&
          books.map((book, index) => (
            <li key={index} className={Styles.bookItem}>
              <BooksCards
                book={book}
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
