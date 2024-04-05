import Navbar from "../../components/Navbar/Navbar";
import BooksCards from "../../components/BooksCards/BooksCards";
import {fetchAllBooks, fetchTenBooks} from "../../fetchdata";
import React, { useState, useEffect } from 'react';
import Styles from './BooksPage.module.css';
import FilterBar from "../../components/FilterBar/FilterBar";
import ReactPaginate from "react-paginate";
import { Pagination } from "flowbite-react";
export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const fetchData = async () => {
        try {
            const fetchedBooks = await fetchTenBooks(currentPage);
            setBooks(fetchedBooks.data);

            const fetchAllBooksData = await fetchAllBooks();

            const extractedAuthors = fetchAllBooksData.flatMap((book) => (book.authors ? book.authors : []));
            const uniqueAuthors = [...new Set(extractedAuthors)];

            const extractedCategorys = fetchAllBooksData.flatMap((book) => (book.categories ? book.categories : []));
            const uniqueCategorys = [...new Set(extractedCategorys)];

            setAuthors(uniqueAuthors);
            setCategorys(uniqueCategorys);

            setIsDataLoaded(true); // Set data loaded to true after fetching data

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchData().then(r => console.log('Data fetched', books.data));
    }, [currentPage]); // Run fetchData whenever the currentPage changes

    const handlePageClick = (data) => {
        console.log(data.selected)
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage); // Update currentPage state
    };



    return (
         <>
            {isDataLoaded && (
                <FilterBar authors={authors} categorys={categorys} />
            )}
            <ul className={Styles.booksContainer}>
                {books && books.length > 0 && books.map((book, index) => (
                    <li key={index} className={Styles.bookItem}>
                        <BooksCards
                            bookURL={book.thumbnailUrl}
                            bookTitle={book.title}
                            bookAuthor={book.authors ? book.authors.join(', ') : 'Unknown Author'}
                            bookPrice={`${book.price} €`}
                        />
                    </li>
                ))}
            </ul>
            <div>
                <ReactPaginate
                    previousLabel={'< Anterior'}
                    nextLabel={'Próximo >'}
                    breakLabel={'...'}
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

