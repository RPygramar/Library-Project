import {createContext, useState} from "react";
import {retrieveBooksByAuthorOrCat} from "../fetchdata";

export const booksContext = createContext();

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);

    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const setStates = (selectedAuthorss, selectedCategoriess, selectedSortt) => {
        setSelectedAuthors(selectedAuthorss);
        setSelectedCategories(selectedCategoriess);
        setSelectedSort(selectedSortt);
    }

    const filterBooks = async (selectedAuthors, selectedCategories, selectedSort, currentPage) => {
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
        console.log(selectedCategories, selectedAuthors)

        const filteredBooks = await retrieveBooksByAuthorOrCat(selectedAuthors, selectedCategories,target,order , currentPage);
        setBooks(filteredBooks[0]);
        setTotalPages(filteredBooks[1]);

  };

    return (
        <booksContext.Provider value={{books, filterBooks, setBooks, selectedAuthors, setSelectedAuthors, selectedCategories, setSelectedCategories, selectedSort, setSelectedSort, setStates}}>
            {children}
        </booksContext.Provider>
    )
}