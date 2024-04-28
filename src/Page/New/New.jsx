import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Footer from "../../Component/Navbar/Footer";

export default function New() {
    const [figures, setFigures] = useState([]);

    useEffect(() => {
      const fetchFigures = async () => {
        try {
          const collectionRef = collection(db, "Figure-List");
          const querySnapshot = await getDocs(collectionRef);
          const fetchedFigures = [];
          const today = new Date();
          today.setMonth(today.getMonth() - 1);
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const releaseDate = data.ReleaseDate ? data.ReleaseDate.toDate() : null;
            if (releaseDate && releaseDate >=today){
            const figure = {
              id: doc.id,
              image: data.Image || [],
              name: data.Name,
              price: data.Price,
              status: data.Status,
              tag: data.Tag,
              release: data.ReleaseDate ? data.ReleaseDate.toDate() : null
            };
            fetchedFigures.push(figure);
        }
          });
  
          setFigures(fetchedFigures);
        } catch (error) {
          console.error("Error fetching figures:", error);
        }
      };
  
      fetchFigures();
    }, []);
  
    return (
      <>
  <div className="trending-container">
    <h2>New </h2>
    <div className="figure-grid">
  {figures.length > 0 ? (
    figures.map((figure) => (
      <div key={figure.id} className="figure-item">
        {(figure.image && Array.isArray(figure.image) && figure.image.length > 0 && (
          <img src={figure.image[0]} alt={figure.name} />
        ))||figure.image&& (!Array.isArray(figure.image))&&(
            <img src={figure.image} alt={figure.name} />
        )}
        <h3>{figure.name}</h3>
        <p>Price: {figure.price}</p>
        <p>Status: {figure.status}</p>
        <p>Tag: {figure.tag}</p>
        <p>Release Date: {figure.release ? figure.release.toLocaleDateString() : 'N/A'}</p>
        <button>Add to Cart</button>
      </div>
    ))
  ) : (
    <p>Sorry, there are no new figures. Please come again later.</p>
  )}
</div>
  </div>
  <Footer />
  </>
    );
  }