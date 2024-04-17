import {createContext, useState} from "react";
import {retrieveBooksByAuthorOrCat} from "../fetchdata";

export const booksContext = createContext();

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);





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

        setSelectedAuthors(selectedAuthorss);
        setSelectedCategories(selectedCategoriess);

        console.log(selectedCategories, selectedAuthors)

        setTotalPages(filteredBooks[1]);
        console.log(filteredBooks[1])
  };

    return (
        <booksContext.Provider value={{books, filterBooks, setBooks, selectedAuthors, setSelectedAuthors, selectedCategories, setSelectedCategories, selectedSort, setSelectedSort}}>
            {children}
        </booksContext.Provider>
    )
}