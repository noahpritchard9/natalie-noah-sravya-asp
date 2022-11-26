import { useQuery } from '@tanstack/react-query'
import {
	Linking,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
	Image,
} from 'react-native'
import { RECIPE_API_KEY } from '../apiKeys'
import { Instructions } from '../types/instructionTypes'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': RECIPE_API_KEY,
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
	},
}

export const InstructionsScreen = ({
	navigation,
	route,
}: {
	navigation: any
	route: any
}) => {
	const id: string = route.params.id

	const fetchInstructions = async () => {
		console.log('id', id)
		const res = await fetch(
			`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
			options
		)
		return (await res.json()) as Instructions
	}

	const instructionsQuery = useQuery(['instructions'], fetchInstructions)

	if (instructionsQuery.isLoading) return <Text>Loading...</Text>

	if (instructionsQuery.isError)
		return <Text>{(instructionsQuery.error as Error).message}</Text>

	return (
		<SafeAreaView>
			<View className='flex items-center justify-center m-2'>
				<Image
					source={{ uri: instructionsQuery.data.image }}
					style={{ width: 175, height: 175 }}
					className='rounded-xl items-center'
				></Image>

				<Text className='text-2xl font-bold'>
					{instructionsQuery.data.title}
				</Text>
				<Text>
					Ready in{' '}
					<Text className='font-bold'>
						{instructionsQuery.data.readyInMinutes}
					</Text>{' '}
					minutes
				</Text>
				<Text className='text-2xl font-bold mt-2'>Ingredients:</Text>

				<View className='flex'>
					{instructionsQuery.data.extendedIngredients.map((i, index) => (
						<Text>
							{index + 1}. {i.name}
						</Text>
					))}
				</View>
				<View className='flex items-center justify-center mt-4'>
					<TouchableOpacity
						onPress={() => Linking.openURL(instructionsQuery.data.sourceUrl)}
					>
						<Text className='text-xl underline'>See complete recipe</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	)
}
