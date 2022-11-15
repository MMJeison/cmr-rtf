import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../../store/slices/usersSlice";

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

import SearchIcon from "@mui/icons-material/Search";

const columns = [
    { id: 'id', label: 'ID', minWidth: 40, align: 'center' },
    { id: 'username', label: 'Username', minWidth: 50, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 50, align: 'center' },
    { id: 'actions', label: 'Actions', minWidth: 50, align: 'center' },
];

const Users = () => {
    const dispatch = useDispatch();
    const [usrs, setUsrs] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const usersState = useSelector((state) => state.users);
    const users = usersState.users;
    const loading = usersState.loading;
    const error = usersState.error;

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
        users.length === 0 && dispatch(fetchUsers());
        console.log(usersState);
        const time = setTimeout(() => {
            if (!loading && !error) {
                const filteresUsers = users.filter((usr) => {
                    const str = usr.id + '';
                    return str.includes(search);
                });
                const actions = (usr) => {
                    return (
                        <>
                            <NavLink to={`/admin/users/${usr.id}`} style={{
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
                setUsrs(filteresUsers.map((usr) => {
                    return {
                        ...usr,
                        actions: actions(usr),
                    };
                }));
                setPage(0);
            }
        }, 500);
        return () => clearTimeout(time);
    }, [dispatch, users, loading, error, search]);

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
        return(
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h4" component="h4">
                    {error}
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
                            {usrs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((usr) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={usr.code}>
                                            {columns.map((column) => {
                                                const value = usr[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {value}
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
                    count={usrs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default Users;