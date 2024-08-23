import axios, { AxiosResponse } from 'axios';

type Meal = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	[key: string]: string | undefined;
};

interface MealsResponse {
	meals: Meal[];
}

export const RecipeAPI = {
	async fetchRecipes(): Promise<Meal[]> {
		try {
			const response: AxiosResponse<MealsResponse> = await axios.get(
				'https://www.themealdb.com/api/json/v1/1/search.php?s'
			);
			return response.data.meals;
		} catch (err) {
			console.log(err);
			throw new Error('Error fetching recipes');
		}
	},
	async fetchRecipesById(id: string): Promise<Meal> {
		try {
			const response: AxiosResponse<MealsResponse> = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			);
			return response.data.meals[0];
		} catch (err) {
			console.log(err);
			throw new Error('Error fetching meal by ID');
		}
	},
};
