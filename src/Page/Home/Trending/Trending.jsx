import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase.jsx';
import './Trending.css'; // Import the CSS file

export default function Trending() {
  const [figures, setFigures] = useState([]);

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const collectionRef = collection(db, "Figure-Trending");
        const querySnapshot = await getDocs(collectionRef);
        const fetchedFigures = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const figure = {
            id: doc.id,
            image: data.Image,
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
          <div key={figure.id} className="figure-item">
            <img src={figure.image} alt={figure.name} />
            <h3>{figure.name}</h3>
            <p>Price: {figure.price}</p>
            <p>Status: {figure.status}</p>
            <p>Tag: {figure.tag}</p>
            <button>Add to Cart</button>
          </div>
          
        ))}
        <button>hello world</button>
      </div>
    </div>
  );
}