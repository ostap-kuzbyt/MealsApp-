import {
	Box,
	Text,
	Heading,
	VStack,
	Divider,
	Image,
	Flex,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { MealContext } from '../store/MealContext';

export const RecipeBasket: React.FC = () => {
	const { meals } = useContext(MealContext);

	const ingredientTotals = meals.reduce<Record<string, number>>(
		(totals, meal) => {
			Object.keys(meal)
				.filter(key => key.startsWith('strIngredient') && meal[key])
				.forEach(key => {
					const ingredient = meal[key]!;
					if (totals[ingredient]) {
						totals[ingredient] += 1;
					} else {
						totals[ingredient] = 1;
					}
				});
			return totals;
		},
		{}
	);

	const mealCounts = meals.reduce<
		Record<string, { meal: (typeof meals)[0]; count: number }>
	>((counts, meal) => {
		if (counts[meal.idMeal]) {
			counts[meal.idMeal].count += 1;
		} else {
			counts[meal.idMeal] = { meal, count: 1 };
		}
		return counts;
	}, {});

	const uniqueMealCount = Object.keys(mealCounts).length;
	const imageSize =
		uniqueMealCount > 5 ? '100px' : uniqueMealCount > 3 ? '150px' : '200px';

	return (
		<Flex direction='column' p={5} bg='gray.50' minHeight='100vh'>
			<Heading mb={6}>Your Basket</Heading>
			<Flex direction='row' wrap='wrap' gap={6}>
				{meals.length === 0 ? (
					<Text>No recipes added to the basket.</Text>
				) : (
					Object.values(mealCounts).map(({ meal, count }) => (
						<Box
							key={meal.idMeal}
							p={4}
							bg='white'
							borderRadius='md'
							boxShadow='md'
							maxW='sm'
						>
							<Heading size='sm' mb={2}>
								{meal.strMeal} {count > 1 && `x${count}`}
							</Heading>
							<Image
								src={meal.strMealThumb}
								alt={meal.strMeal}
								borderRadius='md'
								width={imageSize}
								height={imageSize}
							/>
						</Box>
					))
				)}
			</Flex>
			<Divider my={6} />
			<Box mt={6}>
				<Heading size='md' mb={4}>
					Total Ingredients
				</Heading>
				<VStack spacing={2} align='stretch'>
					{Object.entries(ingredientTotals).map(([ingredient, total]) => (
						<Text key={ingredient} fontWeight='bold'>
							{ingredient}: {total}
						</Text>
					))}
				</VStack>
			</Box>
		</Flex>
	);
};
