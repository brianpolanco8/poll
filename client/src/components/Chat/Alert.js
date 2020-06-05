import React from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alerta(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



export default function Alert() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}>
                <Alert onClose={handleClose} severity="success">
                    This is a success message!
        </Alert>
            </Snackbar>
        </div>
    )
}
