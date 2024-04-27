import { useSelector } from "react-redux";
export default function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div>
      <h1>Cart Page</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((cart) => (
            <li key={cart.id}>
            </li>
          ))}
        </ul>
      )
    }
    </div>
  );
}
