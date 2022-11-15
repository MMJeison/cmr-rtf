import { Box, Grid, Typography } from "@mui/material";
import ButtonDeleteFromCart from "../buttons/ButtonDeleteFromCart";

const ShoppingCartItem = ({ item }) => {
    return (
        <Box sx={{ width: '350px' }}>
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    <img src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '50px', height: '50px' }}
                    />
                </Grid>
                <Grid item xs={7}>
                            <Typography sx={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                {item.product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`Price: $${item.product.price}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {`Quantity: ${item.quantity}`}
                            </Typography>
                </Grid>
                <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
                    <ButtonDeleteFromCart item={item} />
                </Grid>
            </Grid>
            <Box sx={{ borderBottom: '1px solid #e0e0e0', mt: 1, mb: 1 }} />
        </Box>
    );
};

export default ShoppingCartItem;