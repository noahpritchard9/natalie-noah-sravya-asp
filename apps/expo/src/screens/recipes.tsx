import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

import {
	Image,
	Linking,
	SafeAreaView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { RECIPE_API_KEY } from '../apiKeys'
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
			'X-RapidAPI-Key': RECIPE_API_KEY,
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
		},
	}

	const fetchRecipes = async () => {
		const res = await fetch(
			`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=${userQuery.data?.vegetarian}&intolerances=${userQuery.data?.gluten}&maxCalories=${userQuery.data?.calories}`,
			options
		)
		console.log('fetching recipes')
		return await res.json()
	}

	const recipeQuery = useQuery(['recipes'], fetchRecipes)

	if (recipeQuery.isLoading) return <Text>Loading...</Text>

	if (recipeQuery.isError)
		return <Text>{(recipeQuery.error as Error).message}</Text>

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
			<View className='h-1 w-full bg-black mr-4' />
			<FlashList
				data={recipeQuery.data.results}
				estimatedItemSize={20}
				ItemSeparatorComponent={() => <View className='h-2'></View>}
				renderItem={recipe => <CurrentRecipe {...(recipe.item as Recipe)} />}
			/>
		</SafeAreaView>
	)
}

const CurrentRecipe = (props: Recipe) => {
	return (
		<View className='flex flex-row items-center mt-6 mr-4 ml-1 flex-wrap border rounded-xl'>
			<TouchableOpacity onPress={() => Linking.openURL(props)}>
				<Image
					source={{ uri: props.image }}
					style={{ width: 75, height: 75 }}
					className='rounded-xl'
				></Image>
				<Text className='text-xl'>{props.title}</Text>
			</TouchableOpacity>
		</View>
	)
}
