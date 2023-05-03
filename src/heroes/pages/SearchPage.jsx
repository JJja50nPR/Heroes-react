import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import * as queryString from "query-string";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search )
  const heroes = getHeroesByName(q);

  const showSearch = ( q.length === 0 );
  const showError = ( q.length > 0 ) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const onSearchSubmit = ( event ) => {
    event.preventDefault();

    navigate(`?q=${searchText.toLowerCase().trim()}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-5">

          <h4>Searching</h4>
          <hr />
          <form onSubmit={ onSearchSubmit }>
            <input type="text"
            aria-label="form"
                    placeholder="Search a hero" 
                    className="form-control"
                    name="searchText"
                    autoComplete="off"
                    value={searchText}
                    onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>

        </div>

        <div className="col-7">

          <h4>Results</h4>
          <hr />

          <div 
          aria-label="searchHeroDiv"
          className="alert alert-primary animate__animated animate__fadeInLeft" style={{ display : showSearch ? '' : 'none' }}> 
            Search a hero 
          </div>

          <div
          aria-label="noHeroDiv"
          className="alert alert-danger animate__animated animate__fadeInLeft" style={{ display : showError ? '' : 'none' }}> 
            No hero with <b>{q}</b> 
          </div>

          
          { 
            heroes.map( hero => (
              <HeroCard key={ hero.id } {...hero}/>
            ))
          }

        </div>

      </div>


    </>
  )
}
