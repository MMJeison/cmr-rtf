import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productsSlice";
import { useParams } from "react-router-dom";

import { Box, Grid, Typography} from "@mui/material";

import ProductList from "../product/ProductList";

const ListProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const { search } = useParams();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const prodFiltred = products.products.filter((product) => {
        return (
            product.title.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <Box sx={{
            width: { xs: '99%', sm: '90%', md: '80%', lg: '80%' },
            margin: '30px auto',
        }}>
            <Grid container>
                {products.loading ? (
                <Grid item key={-1} xs={12}>
                    <Typography variant="h3" sx={{textAlign: 'center'}}>
                        {'Loading...'}
                    </Typography>
                </Grid>
                ) : prodFiltred.length > 0 ? prodFiltred.map((product) => (
                    <Grid item key={product.id} xs={12} sm={12} md={12} lg={12}>
                        <ProductList product={product} />
                    </Grid>
                )) : <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h3" sx={{textAlign: 'center'}}>
                        No products found for search: {search}
                    </Typography>
                </Grid>}
            </Grid>
        </Box>
    );
}

export default ListProduct;