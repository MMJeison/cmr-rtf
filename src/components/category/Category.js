import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../store/slices/productsSlice";

import { Box, Grid, Typography } from "@mui/material";

import ProductSection from "../product/ProductSection";

const Message = (props) =>{
    return (
        <Grid item key={props.id} xs={12}>
            <Typography variant="h3" sx={{textAlign: 'center'}}>
                {props.msg}
            </Typography>
        </Grid>
    );
}

const Category = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    const products = useSelector((state) => state.products);
    const prdts = products.products.filter((product) => {
        return product.category === category.replace("+", " ");
    });
    return (
        <Box sx={{
            margin: 'auto',
            width: { xs: '99%', sm: '95%', md: '90%', lg: '85%' },
        }}>
            <Grid container spacing={2}>
                {products.loading ? <Message msg="Loading..." id={-1} />:
                    prdts.length > 0 ? [<Grid item key={-2} xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h3" sx={{textAlign: 'center'}}>
                            {category.replace("+", " ").toUpperCase()}
                        </Typography>
                    </Grid>,
                    prdts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                        <ProductSection product={product} />
                    </Grid>
                    ))] : <Message msg={`No products found for category: ${category}`} id={-2} />}
            </Grid>
        </Box>
    );
}

export default Category;