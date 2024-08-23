import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
	Center,
	Spinner,
	Text,
	Box,
	Heading,
	Image,
	Flex,
	Stack,
	Link,
	Button,
	Alert,
	AlertIcon,
} from '@chakra-ui/react';
import { RecipeAPI } from '../api/recipe';
import { useContext } from 'react';
import { MealContext } from '../store/MealContext';

export const Detail = () => {
	const { id } = useParams();
	const { addMealToBasket } = useContext(MealContext);

	const {
		data: meal,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['meal', id],
		queryFn: () => RecipeAPI.fetchRecipesById(id!),
		staleTime: Infinity,
	});

	if (isLoading) {
		return (
			<Center h='100vh'>
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='teal.500'
					size='xl'
					sx={{
						'& circle': {
							strokeLinecap: 'round',
						},
					}}
				/>
			</Center>
		);
	}
	if (error) {
		return (
			<Alert status='error' borderRadius='md' mt={10}>
				<AlertIcon />
				{error.message}
			</Alert>
		);
	}
	return (
		<Flex
			w={'100%'}
			mt={5}
			justifyContent={'center'}
			direction={{ base: 'column', md: 'row' }}
			align={{ base: 'start', md: 'flex-start' }}
			justify='space-between'
		>
			<Flex
				direction='column'
				p={5}
				bg={'teal.50'}
				w={{ base: '100%', md: '22%' }}
				borderRadius='md'
				boxShadow='lg'
				alignItems='center'
				top={{ md: 8 }}
				mb={{ base: 4, md: 0 }}
			>
				<Heading mb={4} textAlign='center'>
					{meal!.strMeal}
				</Heading>
				<Box mb={4}>
					<Image
						src={meal!.strMealThumb}
						alt='meal image'
						boxSize={{ base: 'full', md: '250px' }}
					/>
				</Box>
				<Button colorScheme='teal' mb={4} onClick={() => addMealToBasket(meal!)}>
					Add to Basket
				</Button>
				<Link href={meal!.strYoutube} isExternal color='teal.500'>
					Watch Video
				</Link>
			</Flex>

			<Flex
				direction={{ base: 'column', md: 'row' }}
				gap={1}
				w={{ base: '100%', md: '75%' }}
				justify='space-between'
			>
				<Box
					p={5}
					w={{ base: '100%', md: '25%' }}
					h={'100%'}
					bg={'teal.50'}
					borderRadius='md'
					boxShadow='lg'
				>
					<Heading size='md' mb={4}>
						Ingredients
					</Heading>
					<Stack spacing={2}>
						{Object.keys(meal!)
							.filter(key => key.startsWith('strIngredient') && meal![key])
							.map((key, index) => (
								<Text key={index}>
									{meal![key]} - {meal![`strMeasure${index + 1}`]}
								</Text>
							))}
					</Stack>
				</Box>

				<Box
					p={5}
					w={{ base: '100%', md: '65%' }}
					h={'100%'}
					bg={'teal.50'}
					borderRadius='md'
					boxShadow='lg'
				>
					<Heading size='md' mb={4}>
						Instructions
					</Heading>
					<Text whiteSpace='pre-line'>{meal!.strInstructions}</Text>
				</Box>
			</Flex>
		</Flex>
	);
};
