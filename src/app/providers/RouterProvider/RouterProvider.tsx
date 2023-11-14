import { createBrowserRouter, Link, RouterProvider as ReactRouterProvider } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';

const router = createBrowserRouter([
	{
		path: '/',
		Component: HomePage,
	},
	{
		path: '/auth',
		Component: LoginPage,

	},
	{
		path: '/login',
		Component: LoginPage,
	},
	{
		path: '/signup',
		Component: SignUpPage,
	},
	{
		path: '*',
		element: <div>Ты куда-то забрел, молодой. Давайка<Link to='/'>домой</Link> лучшe.</div>
	}
]);

export const RouterProvider = () => {
	return <ReactRouterProvider router={router} />;
};