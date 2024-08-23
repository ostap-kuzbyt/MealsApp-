import { Outlet } from 'react-router';
import { Header } from '../component/Header/Header';

export const RootLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
