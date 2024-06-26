import AsyncSelect from 'react-select/async';
import Styles from './FilterBar.module.css';
import Select from "react-select";
import React, {useContext, useEffect, useState} from 'react';

export default function FilterBar({ authors , categorys , filteredFunction }) {


    const formattedAuthors = authors ? authors.map((author) => ({ value: author, label: author })) : [];
    const formattedCategorys = categorys ? categorys.map((category) => ({ value: category, label: category })) : [];

    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedCategorys, setSelectedCategorys] = useState([]);
    const [selectedSort, setSelectedSort] = useState(null);

    const sortOptions = [
        {value:"Preço (mais baixo)", label: "Preço (mais baixo)"},
        {value:"Preço (mais alto)", label: "Preço (mais alto)"},
        {value:"Pontuação (mais alto)", label: "Pontuação (mais alto)"},
        {value:"Pontuação (mais baixa)", label: "Pontuação (mais baixa)"},
        {value: "Nenhum", label: "Nenhum"}
    ]



    useEffect(() => {
            if (selectedAuthors.length > 0 || selectedCategorys.length > 0 || selectedSort) {
                console.log("Selected filter");
            filteredFunction(selectedAuthors, selectedCategorys, selectedSort);
            }
}, [selectedAuthors, selectedCategorys, selectedSort]);


    const handleChange = (selectedOption, action) => {
        console.log(action.action)
        if(action.name ==='author'){
            setSelectedAuthors(selectedOption.map(option => option.value))
        }
        if(action.name ==='category'){
            setSelectedCategorys(selectedOption.map(option => option.value))
        }
        if(action.name ==='sort'){
            setSelectedSort(selectedOption.value)
        }
        if (action.action === 'clear'){
            filteredFunction([], [],null)
        }


    };


    const loadOptionsAuthors = (searchValue, callback) => {

        setTimeout(() => {
            const filteredOptions = formattedAuthors.filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
            );
            callback(filteredOptions);
        }, 1000);
    };

    const loadOptionsCategories = (searchValue, callback) => {

    setTimeout(() => {
        const filteredOptions = formattedCategorys.filter((option) =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
        callback(filteredOptions);
    }, 1000);
};


    return (
        <>
            <div className={Styles.filterContainer}>
                <p >Livros</p>
                <div className={Styles.filterBar}>

                    <div className={Styles.filterContainerLeftSide}>
                        <li><AsyncSelect loadOptions={loadOptionsAuthors} defaultOptions onChange={handleChange}
                                         isMulti placeholder="Filtrar por autor" name="author" defaultValue="Filtrar"/>
                        </li>
                        <li><AsyncSelect loadOptions={loadOptionsCategories} defaultOptions onChange={handleChange}
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