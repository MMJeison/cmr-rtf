import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Box,
} from "@mui/material";

import AdbIcon from '@mui/icons-material/Adb';

const CheckoutAppBar = ({title}) => {
    return (
        <AppBar position="static" elevation={0} color="default" sx={{
            Height: "20vh",
            minHeight: "200px"
        }}>
            <Toolbar sx={{
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: 7,
                paddingBottom: 15,
            }}>
                {title !== undefined &&
                    <Grid container item direction="row" alignItems="center" xs={12} sm={6}>
                        <Grid item>
                            <Box sx={{margin: 3}}>
                                <AdbIcon fontSize="large" />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" noWrap color="primary" sx={{
                                flexGrow: 1,
                                alignSelf: 'flex-end',
                                verticalAlign: 'middle',
                                display: 'inline-flex'
                            }}>
                                {title.toUpperCase()}
                            </Typography>
                        </Grid>
                    </Grid>
                }
            </Toolbar>
        </AppBar>
    );
}

export default CheckoutAppBar;