import 'bootstrap/dist/css/bootstrap.min.css'
import Filter from './Filter';
import { FilterWraper, FilterSpace, FilterButton } from './Filter.styles';
import React, { useContext } from 'react';
import CatalogContext from '../../../contexts/CatalogContext';

const FilterArea = () => {
    let {setFilters} = useContext(CatalogContext);

    const applyFilters = () => {
        let filter_1 = document.getElementById("filter_id_1").value;
        let filter_2 = document.getElementById("filter_id_2").value;
        let filter_3 = document.getElementById("filter_id_3").value;
        let sortNameOrder, sortCountOrder, sortPriceOrder;
        if(filter_1 == "Asc ↑"){
            sortPriceOrder = "asc";
        } else {
            sortPriceOrder = "desc";
        } 

        if(filter_2 == "Asc ↑"){
            sortCountOrder = "asc";
        } else {
            sortCountOrder = "desc";
        } 

        if(filter_3 == "Asc ↑"){
            sortNameOrder = "asc";
        } else {
            sortNameOrder = "desc";
        } 
        setFilters({
            sortNameOrder: sortNameOrder,
            sortCountOrder: sortCountOrder,
            sortPriceOrder: sortPriceOrder,
        });
    }

    return (
        <FilterSpace className="d-flex justify-content-around align-items-center">
            <FilterWraper className="d-flex justify-content-around align-items-center">
                <Filter set_id="filter_id_1" filter_by="Sort by price" first_param="No filter" second_param="Asc ↑" third_param="Desc ↓" />
                <Filter set_id="filter_id_2" filter_by="Sort by count" first_param="No filter" second_param="Asc ↑" third_param="Desc ↓" />
                <Filter set_id="filter_id_3" filter_by="Sort by name" first_param="No filter" second_param="Alphabet ↑" third_param="Counter Alphabet ↓"/>
            </FilterWraper>
            <FilterButton className="border border-dark" onClick={applyFilters}>Apply</FilterButton>
        </FilterSpace>
    )
}

export default FilterArea;