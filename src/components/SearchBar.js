import { useEffect, useState } from "react";
import RenderDrink from "./RenderDrink";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [drinkData, setDrinkData] = useState([]);
  const [clickedDrink, setClickedDrink] = useState(null);
  const [validSearch, setValidSearch] = useState(true);

  const trackInput = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const searchDrink = async (input) => {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`
    );
    const data = await res.json();
    console.log(data);

    return data;
  };

  const randomDrink = async () => {
    const res = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    );
    const data = await res.json();

    return data.drinks[0];
  };

  const handleSearchClick = (e, el) => {
    setClickedDrink(el);
    setSearch("");
  };

  const handleButtonClick = () => {
    randomDrink().then((res) => setClickedDrink(res));
  };

  useEffect(() => {
    if (search !== "") {
      const timer = setTimeout(() => {
        searchDrink(search).then((res) => {
          if (res.drinks === null) {
            setValidSearch(false);
            return;
          }
          setValidSearch(true);
          setDrinkData(res);
        });
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setDrinkData([]);
    }
  }, [search]);

  return (
    <>
      <div id="search" className="search-div">
        <div className="search-container">
          <div className="search-header">
            <h1 className="heading-4">Search your favorite cocktail</h1>
          </div>
          <div className="btn-container">
            <h4>Don't have a favorite drink?</h4>
            <button className="random-btn" onClick={handleButtonClick}>
              Click me for a random cocktail
            </button>
          </div>

          <div className="search">
            <input
              placeholder="Search cocktail"
              onChange={trackInput}
              id="input"
              type="text"
              value={search}
              className={validSearch ? "search-bar" : "search-bar-invalid"}
            />
            <div className={drinkData.drinks ? "dataResult" : ""}>
              {drinkData.drinks
                ? drinkData.drinks.map((el) => {
                    return (
                      <ul>
                        <li
                          onClick={(e) => handleSearchClick(e, el)}
                          className="dataItem"
                        >
                          {el.strDrink}
                        </li>
                      </ul>
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        {clickedDrink && <RenderDrink drink={clickedDrink}></RenderDrink>}
      </div>
    </>
  );
};

export default SearchBar;
