import { Box, Grid, Typography, Button } from '@mui/material';

const ProductSection = (props) => {
    return (
        <Box sx={{
            background: 'white',
            boxShadow: '0 0 2px 4px rgba(0, 0, 0, 0.1)',
        }}>
            <Box
                component={'img'}
                src={props.product.image}
                alt={props.product.title}
                sx={{
                    width: '100%',
                    margin: 'auto',
                }}
            />
            <h3>{props.product.title}</h3>
            <p>{props.product.description}</p>
            <p>{props.product.price}</p>
            <Button variant="contained">Add to cart</Button>
        </Box>
    );
};

export default ProductSection;