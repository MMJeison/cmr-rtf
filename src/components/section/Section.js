import { useState, useEffect } from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ProductSection from '../product/ProductSection';

const Section = (props) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [fisrtProduct, setFirstProduct] = useState(0);
    let len = props.products.length;
    useEffect(() => {
        window.addEventListener('resize', () => setWidth(window.innerWidth));
    }, []);
    let n = 1;
    if (width >= 900) {
        n = 3;
    }else if (width >= 600) {
        n = 2;
    }
    let m = Math.ceil(len / n);
    let k = len - fisrtProduct;
    let l = 0;
    if (k < n) {
        l = n - k;
    }
    console.log(n);
    console.log(len);

    const handleNext = () => {
        if (fisrtProduct + 1 < len) {
            setFirstProduct(fisrtProduct + 1);
        }else{
            setFirstProduct(0);
        }
    };

    const handlePrev = () => {
        if (fisrtProduct - 1 >= 0) {
            setFirstProduct(fisrtProduct - 1);
        }else{
            setFirstProduct(len - 1);
        }
    };

    return (
        <Box sx={{
            margin: 'auto',
            width: { xs: '99%', sm: '95%', md: '90%', lg: '85%' },
        }}>
            <Grid sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography variant="h4">{props.title}</Typography>
            </Grid>
            <Grid container spacing={2}>
                <Grid item key={1} xs={2} sm={1} md={1} lg={1}>
                    <Button onClick={handlePrev} disabled={m===1} sx={{
                        height: '100%',
                    }}>
                        <ArrowBackIosIcon />
                    </Button>
                </Grid>
                <Grid item key={2} xs={8} sm={10} md={10} lg={10}>
                    <Grid container spacing={2}>
                        {len < n && (
                            <Grid item key={-1} xs={0} sm={0} md={n - len === 1 ? 2: 4} lg={n - len === 1 ? 2: 4}>
                            </Grid>
                        )}
                        {props.products.slice(fisrtProduct, fisrtProduct + (len < n  ? len: n)).map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                                <ProductSection product={product} />
                            </Grid>
                        ))}
                        {len > n && props.products.slice(0, l).map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={4}>
                                <ProductSection product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item key={3} xs={2} sm={1} md={1} lg={1}>
                    <Button onClick={handleNext} disabled={m===1} sx={{
                        height: '100%',
                    }}>
                        <ArrowForwardIosIcon />
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Section;