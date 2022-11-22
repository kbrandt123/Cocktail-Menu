import "./RenderDrink.css";
import { useState, useEffect } from "react";
const RenderDrink = (props) => {
  const [ingredients, setIngredient] = useState([]);
  useEffect(() => {
    getIngredients(props.drink);
  }, [props.drink]);

  const getIngredients = (drink) => {
    let ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`])
        ingredients.push(
          `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}`
        );
    }
    setIngredient(ingredients);
  };

  return (
    <>
      <div className="cocktail-div">
        <div
          className="cocktail-img-div"
          // style={{ backgroundImage: `url(${props.drink.strDrinkThumb})` }}
        >
          <img className="image" src={props.drink.strDrinkThumb} />
        </div>
        <div className="cocktail-info-div">
          <div className="main-info-div">
            <h1 className="heading-5">{props.drink.strDrink}</h1>
            <p className="instructions">{props.drink.strInstructions}</p>
          </div>
          <div className="subinfo-div">
            <div className="ingredients">
              <h3 className="heading-6">Ingredients:</h3>
              <ul>
                {ingredients.map((el, i) => (
                  <li key={i}>{el}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RenderDrink;
