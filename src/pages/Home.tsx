import { useQuery } from '@tanstack/react-query';
import { RecipeAPI } from '../api/recipe';
import {
	Alert,
	AlertIcon,
	Button,
	Center,
	Container,
	HStack,
	Image,
	List,
	ListItem,
	Skeleton,
	Text,
	Box,
	Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { getSegment } from '../utils/setSegment';

interface Meal {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
}

interface QueryResult {
	data: Meal[] | undefined;
	isLoading: boolean;
	error: Error | null;
}

export const Home = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState<number>(1);
	const [pagesCount, setPagesCount] = useState<number | null>(null);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState('');

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const {
		data: mealsList,
		isLoading,
		error,
	}: QueryResult = useQuery({
		queryKey: ['recipe'],
		queryFn: () => RecipeAPI.fetchRecipes(),
	});

	const filteredNoteList = mealsList?.filter(meal => {
		const containsMeal = meal.strMeal
			.trim()
			.toUpperCase()
			.includes(searchTerm.trim().toUpperCase());
		return containsMeal;
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (timeoutRef.current) {
			setIsSearching(true);
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setSearchTerm(value);
			setIsSearching(false);
		}, 1000);
	};

	useEffect(() => {
		if (filteredNoteList) {
			if (filteredNoteList.length % 5 === 0) {
				return setPagesCount(filteredNoteList.length / 5);
			} else {
				return setPagesCount(filteredNoteList.length / 5 + 1);
			}
		}
	}, [filteredNoteList]);

	if (error) {
		return (
			<Alert status='error' borderRadius='md' mt={10}>
				<AlertIcon />
				Error loading meals
			</Alert>
		);
	}
	return (
		<Box>
			<Container
				mt={'10px'}
				maxW='container.md'
				bg='rgba(203, 196, 174, 0.9)'
				borderRadius='md'
				boxShadow='lg'
				p={5}
			>
				<Input
					placeholder='Search for recipes...'
					onChange={handleChange}
					mb={4}
				/>
				<List spacing={3}>
					{isLoading || isSearching
						? [...Array(5)].map((_, i) => (
								<ListItem key={'skeleton' + i}>
									<Skeleton height={'82.6px'} borderRadius='md' />
								</ListItem>
						  ))
						: getSegment(filteredNoteList || [], page).map((meal: Meal) => (
								<ListItem
									onClick={() => navigate(`/recipe/${meal.idMeal}`)}
									key={meal.idMeal}
									p={'10px'}
									borderWidth={'1px'}
									borderRadius={'md'}
									display={'flex'}
									alignItems={'center'}
									cursor={'pointer'}
									_hover={{ bg: 'teal.400' }}
									transition='background-color 0.5s'
								>
									<Image
										borderRadius={'full'}
										boxSize={'65px'}
										src={meal.strMealThumb}
										alt={meal.strMeal}
									/>
									<Text pl={4} fontSize={'lg'} fontWeight={'semibold'}>
										{meal.strMeal}
									</Text>
								</ListItem>
						  ))}
				</List>
				{filteredNoteList?.length !== 0 && (
					<HStack
						spacing={4}
						display={'flex'}
						justifyContent={'center'}
						mt={10}
					>
						<Button
							isDisabled={page === 1}
							onClick={() => setPage(prevPage => prevPage - 1)}
							variant='solid'
							colorScheme='teal'
						>
							Load previous page
						</Button>
						<Button
							isDisabled={page === 5}
							onClick={() => setPage(prevPage => prevPage + 1)}
							variant='solid'
							colorScheme='teal'
						>
							Load next page
						</Button>
					</HStack>
				)}
				<Center mt={4}>
					{Array.from({ length: pagesCount! }).map((_, i) => (
						<Button
							variant={page === i + 1 ? 'solid' : 'link'}
							colorScheme='teal'
							onClick={() => setPage(i + 1)}
							key={'button' + i}
							mx={1}
						>
							{i + 1}
						</Button>
					))}
				</Center>
			</Container>
		</Box>
	);
};
