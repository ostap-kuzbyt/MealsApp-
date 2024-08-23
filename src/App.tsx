import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home.tsx';
import { Detail } from './pages/Detail.tsx';
import { RecipeBasket } from './pages/RecipeBasket.tsx';
import { RootLayout } from './pages/RootLayout.tsx';
import { MealProvider } from './store/MealContext.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/recipe/:id', element: <Detail /> },
			{ path: '/basket', element: <RecipeBasket /> },
		],
	},
	{ path: '*', element: <div>page not found</div> },
]);

export const App = () => {
	return (
		<MealProvider>
			<RouterProvider router={router} />
		</MealProvider>
	);
};
