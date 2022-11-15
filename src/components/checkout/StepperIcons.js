import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import ContactMail from '@mui/icons-material/ContactMail';
import Payment from '@mui/icons-material/Payment';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SellIcon from '@mui/icons-material/Sell';

const style = makeStyles(theme => ({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        background: theme.palette.primary.main,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        background: theme.palette.primary.main
    },
}));

const StepperIcons = props => {
    const classes = style();
    const { active, completed } = props;

    const icons = {
        1: <ShoppingBagIcon />,
        2: <ContactMail />,
        3: <Payment />,
        4: <SellIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

export default StepperIcons;