import { useEffect, useState, useReducer } from "react";
import RenderDrink from "./RenderDrink";
import "./SearchBar.css";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [drinkData, setDrinkData] = useState([]);
  const [clickedDrink, setClickedDrink] = useState(null);

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

  const handleClick = (e, el) => {
    setClickedDrink(el);
    setSearch("");
  };

  useEffect(() => {
    if (search !== "") {
      const timer = setTimeout(() => {
        searchDrink(search).then((res) => {
          if (res.drinks === null) return alert("Please enter a valid drink");
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
      <div className="search">
        <div className="searchInputs">
          <input
            placeholder="Search cocktail"
            onChange={trackInput}
            id="input"
            type="text"
            value={search}
          />
        </div>
        <div className={drinkData.drinks ? "dataResult" : ""}>
          {drinkData.drinks
            ? drinkData.drinks.map((el) => {
                return (
                  <ul>
                    <li
                      onClick={(e) => handleClick(e, el)}
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
      {clickedDrink && <RenderDrink drink={clickedDrink}></RenderDrink>}
    </>
  );
};

export default SearchBar;
