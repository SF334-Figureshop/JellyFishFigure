import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FigureDetails.css";
import QuantityButton from "../../Component/Navbar/Button/Counter";
import Paper from "@material-ui/core/Paper";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Ecommerce/CartSlice";

export default function FigureDetails() {
  const { id } = useParams();
  const [figure, setFigure] = useState(null);
  const dispatch = useDispatch(); 
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchFigure = async () => {
      try {
        const docRef = doc(db, "Figure-List", id);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFigure({ id: docSnapshot.id, ...data });
        } else {
          console.log("Figure not found");
        }
      } catch (error) {
        console.error("Error fetching figure:", error);
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
        return (
          <Carousel className="image-carousel">
            {figure.Image.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${figure.Name} ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        );
      } else {
        return <img src={figure.Image} alt={figure.Name} className="image-single"/>;
      }
    }
    return null;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(figure));
  };

  return (
    <>
      <paper elevation={3}>
        <div className="figure-upper">
          {renderImages()}
          <div className="figure-details">
            <h2>{figure.Name}</h2>
            <p className="price">Price: {figure.Price}</p>
            <p className="status">
              Status: {figure.Stock >0 ? "Instock" : <span style={{ color: 'red' }}>Sold out</span>}
            </p>
            <p className="stock">Stock: {figure.Stock}</p>
            <div className="tags">
              <span className="tag">Tag : {figure.Tag.join(", ")}</span>
            </div>
            {figure.Stock ?<Button variant="contained" onClick={handleAddToCart}>Add to Cart</Button>:<Button disabled variant="contained" color="primary">Out of Stock</Button>}
            
          </div>

          
        </div>

        <p className="description">Description: {figure.Description}</p>
      </paper>
    </>
  );
}
