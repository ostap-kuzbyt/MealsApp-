import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import bgLogo from '../../assets/bgLogo.jpg';

interface MainBackgroundProps {
	children: ReactNode;
}

export const MainBackground = ({ children }: MainBackgroundProps) => {
	return (
		<Box
			bgImage={bgLogo}
			bgSize='cover'
			bgPosition='center'
			bgRepeat='no-repeat'
			minHeight='100vh'
			p={5}
		>
			{children}
		</Box>
	);
};
