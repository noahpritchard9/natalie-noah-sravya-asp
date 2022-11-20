import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import {
	Image,
	SafeAreaView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { Recipe, RecipeResults } from '../types/recipeTypes'
import { trpc } from '../utils/trpc'

export const RecipeScreen = ({
	navigation,
	route,
}: {
	navigation: any
	route: any
}) => {
	const userQuery = trpc.user.byName.useQuery(route.params.name)

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '8a681a5a5amsh9568868778adfe3p1aa274jsn45b2ced522c9',
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	}

	const fetchRecipes = async (): Promise<RecipeResults> => {
		const res = await fetch(
			`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=${userQuery.data?.vegetarian}&intolerances=${userQuery.data?.gluten}&maxCalories=${userQuery.data?.calories}`,
			options
		)
		return await res.json()
	}

	const recipeQuery = useQuery(['recipes'], fetchRecipes)

	if (recipeQuery.isLoading) return <Text>Loading...</Text>

	if (recipeQuery.isError)
		return <Text>{(recipeQuery.error as Error).message}</Text>

	return (
		<SafeAreaView className='flex flex-col m-2'>
			<TouchableOpacity
				onPress={() => navigation.navigate('Home', { name: route.params.name })}
				className='absolute top-0 right-0 after:border p-2 rounded bg-sky-500'
			>
				<Text>Preferences</Text>
			</TouchableOpacity>
			<Text>{JSON.stringify(recipeQuery.data, null, 2)}</Text>
			{/* <View className='flex mt-12'>
				{recipeQuery.data?.map(recipe => (
					<Text>{recipe.title}</Text>
				))}
			</View> */}
		</SafeAreaView>
	)
}
