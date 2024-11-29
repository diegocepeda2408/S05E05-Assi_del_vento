import { useEffect, useRef } from "react";
import { useFetch } from "../../hooks/useFetch";

function Filters ({handleTypeFilter}) {
    const [types, setTypes] = useFetch();
    const selectRef = useRef()

    useEffect(() => {
        getTypes()
    },[])

    const getTypes = () => {
        setTypes('https://pokeapi.co/api/v2/type')
    }

    return (
        <select ref={selectRef} onChange={() => handleTypeFilter(selectRef.current.value)} className="filters__dropdown">
            <option value="" className="filters__dropdown-option">All pokemon types</option>
            {types?.results?.map( type => (
                <option key={type.name} value={type.name} className="filters__dropdown-option">{type.name}</option>
            ))}
        </select>
    )
};

export default Filters;