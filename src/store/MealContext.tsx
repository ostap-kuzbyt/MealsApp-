import  { createContext, useState, ReactNode } from 'react';

type Meal = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	[key: string]: string | undefined;
};

interface MealContextType {
	meals: Meal[];
	addMealToBasket: (meal: Meal) => void;
}

export const MealContext = createContext<MealContextType>({
	meals: [],
	addMealToBasket: () => {},
});

interface MealProviderProps {
	children: ReactNode;
}

export const MealProvider = ({ children }: MealProviderProps) => {
	const [meals, setMeals] = useState<Meal[]>([]);

	const addMealToBasket = (meal: Meal) => {
		setMeals(prevMeals => [...prevMeals, meal]);
	};

	return (
		<MealContext.Provider value={{ meals, addMealToBasket }}>
			{children}
		</MealContext.Provider>
	);
};
