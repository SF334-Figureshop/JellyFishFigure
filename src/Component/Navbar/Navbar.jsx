import './Navbar.css';
import SearchBar from './Searchbar';
import logo from './logo.png';
import { CiShoppingCart } from "react-icons/ci";

function Navbar(){
    return (
        <>
        <div className="Navbar-container">
        <ul className="Navbar-menu">
        <li><div className="Navbar-logo">
        <img className="logo" src={logo} alt="Logo" />
        </div></li>
        <li>Browse</li>
        <li>Trending</li>
        <li>New</li>
        <li className='search-bar'>
            <SearchBar />
        </li>
        <li className='Shopping-cart'>
        <CiShoppingCart size={30}/>
        </li>
        </ul>
        </div>
        </>
    )
}

export default Navbar;