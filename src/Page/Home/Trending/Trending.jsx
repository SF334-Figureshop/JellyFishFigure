import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase.jsx';
import { Link } from 'react-router-dom';
import './Trending.css';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Ecommerce/CartSlice";

export default function Trending() {
  const [figures, setFigures] = useState([]);
  const dispatch = useDispatch(); 
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const collectionRef = collection(db, "Figure-List");
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFigures = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const figure = {
            id: doc.id,
            Image: data.Image || [],
            Name: data.Name,
            Price: data.Price,
            status: data.Status,
            Stock: data.Stock,
            tag: data.Tag,
          };
          fetchedFigures.push(figure);
        });
        setFigures(fetchedFigures);
        
      } catch (error) {
        console.error("Error fetching figures:", error);
      }
    };

    fetchFigures();
  }, []);

  const handleAddToCart = (figure) => {
    dispatch(addToCart(figure));
  };

  return (
    <div className="trending-container">
      <h2>Figure Trending</h2>
      <div className="figure-grid">
        {figures.map((figure) => (
          <div key={figure.id} className="figure-item">
            <Link to={`/figure/${figure.id}`}>
              {figure.Image && Array.isArray(figure.Image) && figure.Image.length > 0 ? (
                <img src={figure.Image[0]} alt={figure.Name} />
              ) : figure.Image && !Array.isArray(figure.Image) ? (
                <img src={figure.Image} alt={figure.Name} />
              ) : null}
              <h3>{figure.Name}</h3>
              <p>Price: {figure.Price} $</p>
              <p>Status: {figure.status ? "In Stock" : <div style={{ color: 'red' }}>Sold out</div> }</p>
            </Link>
            {figure.Stock?<Button variant='contained'  onClick={() => handleAddToCart(figure)}>Add to Cart</Button>:<Button variant='contained' disabled>Sold Out</Button>}
            
          </div>
        ))}
      </div>
    </div>
  );
}