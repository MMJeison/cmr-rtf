import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchProducts } from '../../store/slices/productsSlice';

import {
    Box,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const columns = [
    { id: 'id', label: 'ID', minWidth: 40, align: 'center' },
    { id: 'title', label: 'Title', minWidth: 50, align: 'center' },
    { id: 'stock', label: 'Stock', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];


const Products = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [prods, setProds] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const productsState = useSelector((state) => state.products);
    const products = productsState.products;
    const loading = productsState.loading;
    const error = productsState.error;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value.trim());
    }

    useEffect(() => {
        products.length === 0 && dispatch(fetchProducts());
        console.log(productsState);
        const time = setTimeout(() => {
            if (!loading && !error) {
                const filteredProducts = products.filter((product) => {
                    const str = product.id + '';
                    return str.includes(search);
                });
                const actions = (prod) => {
                    return (
                        <>
                            <NavLink to={`/admin/products/${prod.id}`} style={{
                                textDecoration: 'none',
                            }}>
                                <Button variant="contained" color="primary">
                                    View
                                </Button>
                            </NavLink>
                            <Button variant="contained" color="secondary">
                                Delete
                            </Button>
                        </>
                    );
                }
                setProds(filteredProducts.map((prod) => {
                    return {
                        ...prod,
                        actions: actions(prod),
                    };
                }));
                setPage(0);
            }
        }, 500);
        return () => clearTimeout(time);
    }, [dispatch, products, search, loading, error]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4" component="h4">
                    Loading...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4" component="h4">
                    {`Ha ocurrido un error: ${error}`}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '80%', margin: '20px auto' }}>
            <Paper sx={{ overflow: 'hidden' }}>
                <div className="header">
                    <div className='search'>
                        <SearchIcon className='search-icon' />
                        <input type="text"
                            value={search} onChange={handleChangeSearch}
                            placeholder="Search" className='search-input' />
                    </div>
                </div>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {prods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((prod) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={prod.code}>
                                            {columns.map((column) => {
                                                const value = prod[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        { column.id === 'stock' ? prod.rating.count : value }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[7, 14, 28]}
                    component="div"
                    count={prods.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Products;