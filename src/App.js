import SearchBar from "./components/SearchBar";
import "./App.css";
import { Link } from "react-scroll";
const App = () => {
  return (
    <>
      <div className="image-div">
        <div className="hero-div">
          <div className="hero-info">
            <h2 className="heading-2">Welcome to, </h2>
            <h1 className="heading-3">Cocktail Paradise</h1>
            <Link
              className="button w-button"
              to={"search"}
              spy={true}
              smooth={true}
              offset={0}
            >
              {" "}
              Take me there!
            </Link>
          </div>
        </div>
      </div>
      {/* <div id="search" className="search-div">
        <div className="search-header">
          <h1 className="heading-4">Search your favorite cocktail</h1>
        </div>
        
      </div> */}
      <SearchBar />
    </>
  );
};

export default App;
