import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center' sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color='inherit' to='https://github.com/ArthurNyan'>
                Aryan project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}