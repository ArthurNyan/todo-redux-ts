import { Link, Typography } from '@mui/material';


export function Copyright() {
    return (
        <Typography variant='body2' color='text.secondary' align='center' sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color='inherit' href='https://github.com/ArthurNyan'>
                Aryan project
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}