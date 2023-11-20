import { useAddTodoMutation, useGetNoSqlTodoQuery, usePatchTodoMutation, useRemoveTodoMutation } from '@/app/store/notesApi';
import { Checkbox, Container, IconButton, InputBase, LinearProgress, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { ITodo } from '@/shared/assets/lib/ITodo';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/api/useAuth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';

export const TodoApp = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { data, isLoading } = useGetNoSqlTodoQuery('lQGdlEmEzPewDhbygLcAPeEbVzi2');
    const [deletePost] = useRemoveTodoMutation();
    const [addTodo] = useAddTodoMutation();
    const [patchTodo] = usePatchTodoMutation();

    useEffect(() => {
        auth.isAuth ? null : navigate('/auth');
    }, [auth.isAuth, navigate]);

    const newTodo = () => {
        const body = (document.getElementById('textFiled') as HTMLInputElement).value;
        addTodo({ userId: auth.id || 'Error', body: body, checked: false }).unwrap();
    };

    if (isLoading)
        return <LinearProgress />;

    return <>
        <Container maxWidth='md'>
            <Typography variant='h2' component='h1' sx={{ textAlign: 'center', m: 16 }}>Todo list</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {data?.map((todo: ITodo) => {
                    return (
                        <ListItem
                            key={todo.id}
                            secondaryAction={
                                <>
                                    <IconButton aria-label='delete' onClick={() => deletePost(todo.id).unwrap()} color='success'>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                    <Checkbox
                                        edge='end'
                                        onClick={() => patchTodo({ checked: !todo.checked, id: todo.id }).unwrap()}
                                        checked={todo.checked}
                                    />
                                </>
                            }
                            disablePadding>
                            <ListItemButton onClick={() => patchTodo({ checked: !todo.checked, id: todo.id }).unwrap()} >
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