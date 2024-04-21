import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Navbar() {
  return (
    <>
      <div className="Navbar-container">
        <ul className="Navbar-menu">
          <li>
            <div className="Navbar-logo">
              <img className="logo" src={logo} alt="Logo" />
            </div>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/trending">Trending</Link>
          </li>
          <li>
            <Link to="/new">New</Link>
          </li>
          <li className="search-bar">
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </li>
          <li className="Shopping-cart">
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
