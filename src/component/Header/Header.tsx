import { Box, Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
	const { pathname } = useLocation();

	const isActive = (path: string): boolean => pathname === path;

	return (
		<Flex
			alignItems='center'
			justifyContent='space-between'
			bg='teal.500'
			p={4}
			color='white'
			boxShadow='md'
		>
			<Flex alignItems='center' gap={4}>
				<Box
					ml='20px'
					p='2px'
					bg={isActive('/') ? 'teal.700' : 'transparent'}
					_hover={{ textDecoration: 'underline' }}
				>
					<Link to='/'>Home</Link>
				</Box>
			</Flex>
			<Box
				mr='20px'
				p='2px'
				bg={isActive('/basket') ? 'teal.700' : 'transparent'}
				_hover={{ textDecoration: 'underline' }}
			>
				<Link to='/basket'>Basket</Link>
			</Box>
		</Flex>
	);
};
