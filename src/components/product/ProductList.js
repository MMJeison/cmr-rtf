import { useSelector } from "react-redux";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

import ButtonAddToCart from "../buttons/ButtonAddToCart";

const ProductList = ({ product }) => {
    const cart = useSelector((state) => state.shoppingCart);
    let q = 0;
    const aux = cart.shoppingCart.find((item) => item.id === product.id);
    if (aux) {
        q = aux.quantity;
    }
    return (
        <Card sx={{ display: 'flex', margin: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: 150, margin: 1 }}
                image={product.image}
                alt={product.title}
            />
            <Box sx={{ width: '100%', padding: '0 15px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {`Stock: ${product.rating.count - q}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {`Price: $${product.price.toFixed(2)}`}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {Array(5).fill().map((_, i) => (
                            i < product.rating.rate ? (
                                <p key={i}>&#11088;</p>) : (
                                <p key={i}>&#9734;</p>
                            )
                        ))}
                    </Box>
                    <ButtonAddToCart product={product} quantity={1} />
                </Box>
            </Box>
        </Card>
    );
};

export default ProductList;