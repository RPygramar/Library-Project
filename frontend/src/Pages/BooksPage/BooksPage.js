import Navbar from "../../components/Navbar/Navbar";
import BooksCards from "../../components/BooksCards/BooksCards";
import {fetchAllBooks} from "../../fetchdata";
import React, { useState, useEffect } from 'react';
import Styles from './BooksPage.module.css';
import FilterBar from "../../components/FilterBar/FilterBar";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchData = async () => {
        try {
            const fetchedBooks = await fetchAllBooks();
            setBooks(fetchedBooks);

            const extractedAuthors = fetchedBooks.flatMap((book) => (book.authors ? book.authors : []));
            const uniqueAuthors = [...new Set(extractedAuthors)];

            const extractedCategorys = fetchedBooks.flatMap((book) => (book.categories ? book.categories : []));
            const uniqueCategorys = [...new Set(extractedCategorys)];

            setAuthors(uniqueAuthors);
            setCategorys(uniqueCategorys);

            setIsDataLoaded(true); // Set data loaded to true after fetching data

        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            {isDataLoaded && ( // Render FilterBar only when data is loaded
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
    </>
  );
}

