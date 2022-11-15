import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';

import { Grid, Typography } from '@mui/material';

import Section from '../section/Section';

const Message = (props) =>{
    return (
        <Grid item key={props.id} xs={12}>
            <Typography variant="h3" sx={{textAlign: 'center'}}>
                {props.msg}
            </Typography>
        </Grid>
    );
}

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const categories = useSelector((state) => state.categories.categories);
    const sections = {};
    categories.forEach((category) => {
        let prdts = products.products.filter((product) => {
            return product.category === category.replace('+', ' ');
        });
        if(prdts.length > 0){
            sections[category] = prdts;
        }
    });

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <>
            {products.loading ? <Message msg="Loading..." id={-1} /> :
                Object.keys(sections).length > 0 ? (Object.keys(sections).map((key) => {
                return <Section key={key} title={key.replace('+', ' ').toUpperCase()} products={sections[key]} />;
            })): <Message msg="No products found" id={-2} />}
        </>
    );
};

export default Home;