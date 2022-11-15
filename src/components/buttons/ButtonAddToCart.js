import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/shoppingCartSlice";

import { Button } from '@mui/material';
import { SwalMessage } from "../../assets/swalmessage/SwalMessage";

const ButtonAddToCart = ({ product, quantity }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.shoppingCart);
    let q = 0;
    const aux = cart.shoppingCart.find((item) => item.id === product.id);
    if (aux) {
        q = aux.quantity;
    }

    const handleAddToCart = () => {
        if((q + quantity) <= product.rating.count) {
            dispatch(addToCart({ product: product, qtity: quantity }));
        }else{
            SwalMessage("Error", "No items in stock", "error", false, 2000);
        }
    };

    return (
        // <Button variant="contained" onClick={handleAddToCart}>
        //     Add to cart
        // </Button>
        <Button size="large" color="primary" onClick={handleAddToCart}>
            Add to cart
        </Button>
    );
};

export default ButtonAddToCart;