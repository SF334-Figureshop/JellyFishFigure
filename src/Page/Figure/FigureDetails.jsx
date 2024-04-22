import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';

export default function FigureDetails() {
  const { id } = useParams();
  const [figure, setFigure] = useState(null);

  useEffect(() => {
    const fetchFigure = async () => {
      try {
        const docRef = doc(db, 'Figure-Trending', id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFigure({ id: docSnapshot.id, ...data });
        } else {
          console.log('Figure not found');
        }
      } catch (error) {
        console.error('Error fetching figure:', error);
      }
    };

    fetchFigure();
  }, [id]);

  if (!figure) {
    return <div>Loading...</div>;
  }

  const renderImages = () => {
    if (figure.Image) {
      if (Array.isArray(figure.Image)) {
        return figure.Image.map((image, index) => (
          <img key={index} src={image} alt={`${figure.Name} ${index + 1}`} />
        ));
      } else {
        return <img src={figure.Image} alt={figure.Name} />;
      }
    }
    return null;
  };

  return (
    <div className="figure-details">
      <h2>{figure.Name}</h2>
      {renderImages()}
      <p>Price: {figure.Price}</p>
      <p>Status: {figure.Status}</p>
      <p>Tag: {figure.Tag}</p>
      <button>Add to Cart</button>
    </div>
  );
}