import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import HeroCard from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';

const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    
    const [values, handleInputChange] = useForm({
        txtSearch: q
    });

    const { txtSearch } = values;
    
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);
    // const heroesFiltered = getHeroesByName(txtSearch);

   const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${txtSearch}`);//seteamos en la ruta lo q escribimos en la caja de texto
   }
 
    return (
        <div>
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="txtSearch"
                            autoComplete="off"
                            value={txtSearch}
                            onChange={handleInputChange}
                        />

                        <button
                            type="submit"
                            className="btn btn-outline-primary m-1"
                        >
                            Search...
                        </button>

                    </form>
                </div>

                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        ( q === '') &&
                        <div className="alert alert-info">
                            Search a hero
                        </div>
                    }

                    {
                        ( q !== '' && heroesFiltered.length === 0) &&
                        <div className="alert alert-danger">
                            There is no a hero with {q}
                        </div>
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;
