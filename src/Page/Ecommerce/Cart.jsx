import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./CartSlice";
import {
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Button,
  colors,
  Container,
  Typography,
  

} from "@material-ui/core";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ id: itemId }));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity({ id: itemId }));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity({ id: itemId }));
  };

  return (
    <div>
      <h1>Cart Page</h1>
      <Paper elevation={3}>
        {cart.length === 0 ? (
        <Typography align="center" variant="h3"><p>Your cart is empty</p></Typography>
          
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row" align="center">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={item.Image[0]}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" style={{}}>
                      {item.Price}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      <Button style={{ backgroundColor: 'green', color: 'white' }}
                        variant="contained"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </Button>
                      <Button color="secondary"
                        variant="contained"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </Button>
                      <Button 
                        variant="contained"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    Total
                  </TableCell>
                  <TableCell align="right">
                    {cart.reduce(
                      (acc, item) => acc + item.Price * item.quantity,
                      0
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/checkout')}
                    >
                      Buy
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
}
