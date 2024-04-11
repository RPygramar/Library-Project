import AsyncSelect from 'react-select/async';
import Styles from './FilterBar.module.css';
import Select from "react-select";
import React, {useEffect, useState} from 'react';
export default function FilterBar({ authors = [], categorys = [], filterBooks }) {
    const formattedAuthors = authors ? authors.map((author) => ({ value: author, label: author })) : [];
    const formattedCategorys = categorys ? categorys.map((category) => ({ value: category, label: category })) : [];

    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategorys, setSelectedCategorys] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);


    useEffect(() => {
        console.log(selectedAuthors, selectedCategorys, selectedSort);
        if (selectedSort != null || selectedAuthors.length !== 0 || selectedCategorys.length !== null) {
            filterBooks(selectedAuthors, selectedCategorys, selectedSort);
            console.log("filterBooks called")
        };
    }, [selectedAuthors, selectedCategorys, selectedSort]);

    const handleChange = (selectedOption, action) => {

        if(action.name ==='author'){
            setSelectedAuthors(selectedOption.value)
        }
        if(action.name ==='category'){
            setSelectedCategorys(selectedOption.value)
        }
        if(action.name ==='sort'){
            setSelectedSort(selectedOption.value)
        }

    };


    const loadOptionsAuthors = (searchValue, callback) => {
    console.log("loadOptionsAuthors called");
    setTimeout(() => {
        const filteredOptions = formattedAuthors.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        callback(filteredOptions);
    }, 1000);
};

    const loadOptionsCategorys = (searchValue, callback) => {
    console.log("loadOptionsCategorys called");
    setTimeout(() => {
        const filteredOptions = formattedCategorys.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        callback(filteredOptions);
    }, 1000);
};
    const sortOptions = [
        {value:"Preço (mais baixo)", label: "Preço (mais baixo)"},
        {value:"Preço (mais alto)", label: "Preço (mais alto)"},
        {value:"Pontuação (mais alto)", label: "Pontuação (mais alto)"},
        {value:"Pontuação (mais baixa)", label: "Pontuação (mais baixa)"}
    ]

    return (
        <>
            <div className={Styles.filterContainer}>
                <p >Livros</p>
                <div className={Styles.filterBar}>

                    <div className={Styles.filterContainerLeftSide}>
                        <li><AsyncSelect loadOptions={loadOptionsAuthors} defaultOptions onChange={handleChange}
                                         isMulti placeholder="Filtrar por autor" name="author" defaultValue="Filtrar"/>
                        </li>
                        <li><AsyncSelect loadOptions={loadOptionsCategorys} defaultOptions onChange={handleChange}
                                         isMulti placeholder="Filtrar por categoria" name="category" />
                        </li>
                    </div>
                    <div className={Styles.filterContainerRightSide}>
                        <li><Select options={sortOptions} onChange={handleChange} name="sort" placeholder="Ordenar por:"/></li>
                    </div>


                </div>
            </div>
        </>

    );

}