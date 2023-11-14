import { Checkbox, Container, IconButton, InputBase, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { addTodo, compliteToogle, removeTodo } from '@/app/store/todoSlice';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import { ITodo } from '@/shared/assets/lib/ITodo';
import { useEffect } from 'react';
import { useAuth } from '@/shared/api/useAuth';
import { useNavigate } from 'react-router-dom';

export const TodoApp = () => {
    const todos = useSelector((state: RootState) => state.todo.todos);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        auth.isAuth ? null : navigate('/auth');
    }, [auth.isAuth, navigate]);

    const newTodo = () => {
        const body = (document.getElementById('textFiled') as HTMLInputElement).value;
        body && dispatch(addTodo({ body: body }));
    };

    const clicker = (todo: ITodo) => {
        dispatch(compliteToogle(todo));
    };

    return <>
        <Container maxWidth='md'>
            <Typography variant='h2' component='h1' sx={{ textAlign: 'center', m: 16 }}>Todo list</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {todos.map((todo) => {
                    return (
                        <ListItem
                            key={todo.id}
                            secondaryAction={
                                <>
                                    <IconButton aria-label='delete' onClick={() => dispatch(removeTodo(todo))} color='success'>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    <Checkbox
                                        edge='end'
                                        onClick={() => clicker(todo)}
                                        checked={todo.checked}
                                    />
                                </>
                            }
                            disablePadding>
                            <ListItemButton onClick={() => dispatch(compliteToogle(todo))} >
                                <ListItemText sx={{ fontSize: '24px' }} >{todo.body}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Paper component='form' sx={{ mt: '10px', p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <InputBase
                    id='textFiled'
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Write note'
                    inputProps={{ 'aria-label': 'Add new note' }}
                />
                <IconButton type='button' sx={{ p: '10px' }} aria-label='add' onClick={newTodo}>
                    <QueueOutlinedIcon />
                </IconButton>
            </Paper>
        </Container>
    </>;
};