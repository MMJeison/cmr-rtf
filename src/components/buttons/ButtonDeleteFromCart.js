import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/slices/shoppingCartSlice";

import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const ButtonDeleteFromCart = ({ item }) => {
    const dispatch = useDispatch();
    const handleRemoveFromCart = () => {
        dispatch(removeFromCart({ product: item.product, qtity: 1 }));
    };
    return (
        <IconButton aria-label="delete" onClick={handleRemoveFromCart}>
            <DeleteIcon color="error" />
        </IconButton>
    );
};

export default ButtonDeleteFromCart;