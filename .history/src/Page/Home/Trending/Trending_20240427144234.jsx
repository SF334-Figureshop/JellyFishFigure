import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase.jsx';
import { Link } from 'react-router-dom';
import './Trending.css';

export default function Trending() {
  const [figures, setFigures] = useState([]);

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
            image: data.Image || [],
            name: data.Name,
            price: data.Price,
            status: data.Status,
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

  return (
    <div className="trending-container">
      <h2>Figure Trending</h2>
      <div className="figure-grid">
        {figures.map((figure) => (
          <Link key={figure.id} to={`/figure/${figure.id}`}>
            <div className="figure-item">
              {figure.image && Array.isArray(figure.image) && figure.image.length > 0 ? (
                <img src={figure.image[0]} alt={figure.name} />
              ) : figure.image && !Array.isArray(figure.image) ? (
                <img src={figure.image} alt={figure.name} />
              ) : null}
              <h3>{figure.name}</h3>
              <p>Price: {figure.price} $</p>
              <p>Status: {figure.status?"in stock":"sold out"}</p>
              <button>Add to Cart</button>
            </div>
          </Link>
        ))}
        <button>hello world</button>
      </div>
    </div>
  );
}