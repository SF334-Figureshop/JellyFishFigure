import { useSelector } from "react-redux";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              <img src={item.Image} alt={item.name} />
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}