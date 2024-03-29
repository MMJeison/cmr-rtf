import { useSelector } from 'react-redux';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    CardActionArea,
} from '@mui/material';

import ButtonAddToCart from "../buttons/ButtonAddToCart";

const ProductSection = ({ product }) => {

    const cart = useSelector((state) => state.shoppingCart);
    let q = 0;
    const aux = cart.shoppingCart.find((item) => item.id === product.id);
    if (aux) {
        q = aux.quantity;
    }

    return (
        <Card sx={{ marginBottom: 5 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={product.image}
                    alt={product.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}>
                        {product.description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {`Stock: ${product.rating.count - q}`}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {`Price: $${product.price.toFixed(2)}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', justifyItems: 'center', width: '100%' }}>
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
            </CardActions>
        </Card>
    );
};

export default ProductSection;