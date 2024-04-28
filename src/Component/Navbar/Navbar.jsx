import './Navbar.css';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Button } from '@material-ui/core';

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
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
        <li className="Shopping-cart">
          <Link to="/cart">
            <ShoppingCartIcon />
          </Link>
        </li>
        {user ? (
          <li>
            <Button color='primary' variant='contained' onClick={handleSignOut}>Sign Out</Button>
          </li>
        ) : (
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;