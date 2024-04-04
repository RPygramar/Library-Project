import AsyncSelect from 'react-select/async';
import React from 'react';
import Styles from './FilterBar.module.css';
import Select from "react-select";
export default function FilterBar({ authors = [], categorys = [] }) {
    const formattedAuthors = authors ? authors.map((author) => ({ value: author, label: author })) : [];
    const formattedCategorys = categorys ? categorys.map((category) => ({ value: category, label: category })) : [];



    const handleChange = (selectedOption) => {
        console.log(selectedOption);
    };

    const loadOptionsAuthors = (searchValue, callback) => {
    console.log("loadOptionsAuthors called");
    setTimeout(() => {
        const filteredOptions = formattedAuthors.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        console.log('loadOptionsAuthors', searchValue, filteredOptions);
        callback(filteredOptions);
    }, 1000);
};

    const loadOptionsCategorys = (searchValue, callback) => {
    console.log("loadOptionsCategorys called");
    setTimeout(() => {
        const filteredOptions = formattedCategorys.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        console.log('loadOptionsCategorys', searchValue, filteredOptions);
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
                                         isMulti placeholder="Filtrar por autor"/>
                        </li>
                        <li><AsyncSelect loadOptions={loadOptionsCategorys} defaultOptions onChange={handleChange}
                                         isMulti placeholder="Filtrar por categoria"/>
                        </li>
                    </div>
                    <div className={Styles.filterContainerRightSide}>
                        <li><Select options={sortOptions} onChange={handleChange} placeholder="Ordenar por:"/></li>
                    </div>


                </div>
            </div>
        </>

    );

}