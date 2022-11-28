import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import {
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { RECIPE_API_KEY } from '../apiKeys';
import { Recipe } from '../types/recipeTypes';
import { trpc } from '../utils/trpc';

export const RecipeScreen = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const userQuery = trpc.user.byName.useQuery(route.params.name);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': RECIPE_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	};

	const fetchRecipes = async () => {
		try {
			const res = await fetch(
				`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=${userQuery.data?.vegetarian}&intolerances=${userQuery.data?.gluten}&maxCalories=${userQuery.data?.calories}`,
				options
			);
			return await res.json();
		} catch (e) {
			console.log('Error fetching recipes', e);
			return {};
		}
	};

	const recipeQuery = useQuery(['recipes'], fetchRecipes);

	if (recipeQuery.isLoading) return <Text>Loading...</Text>;

	if (recipeQuery.isError)
		return <Text>{(recipeQuery.error as Error).message}</Text>;

	return (
		<SafeAreaView className='flex flex-col m-2 h-full w-full'>
			<View className='flex flex-row items-center justify-between'>
				<Text className='text-2xl'>Recipes</Text>
				<TouchableOpacity
					className='mr-4'
					onPress={() =>
						navigation.navigate('Home', { name: route.params.name })
					}
				>
					<Text>Preferences</Text>
				</TouchableOpacity>
			</View>
			<View className='h-1 w-full bg-black mr-4 mb-2' />
			<FlashList
				data={recipeQuery.data.results}
				estimatedItemSize={20}
				ListEmptyComponent={<Text>No Recipes Found</Text>}
				ItemSeparatorComponent={() => <View className='h-2'></View>}
				renderItem={recipe => (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Instructions', {
								id: (recipe.item as Recipe).id.toString(),
								cals: (
									recipe.item as Recipe
								).nutrition.nutrients[0].amount.toFixed(0),
								name: route.params.name,
							});
						}}
					>
						<CurrentRecipe {...(recipe.item as Recipe)} />
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};

const CurrentRecipe = (props: Recipe) => {
	return (
		<SafeAreaView className='flex flex-row items-center border rounded-xl mr-4'>
			<Image
				source={{ uri: props.image }}
				style={{ width: 75, height: 75 }}
				className='rounded-xl'
			></Image>
			<Text className='text-xl w-3/4 ml-1'>{props.title}</Text>
		</SafeAreaView>
	);
};
