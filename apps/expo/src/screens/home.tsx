import React, { useState } from 'react'

import {
	SafeAreaView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { trpc } from '../utils/trpc'

export const HomeScreen = ({
	navigation,
	route,
}: {
	navigation: any
	route: any
}) => {
	const userQuery = trpc.user.byName.useQuery(route.params.name)

	const [vegan, setVegan] = useState<boolean>(userQuery.data?.vegan ?? false)
	const [vegetarian, setVegetarian] = useState<boolean>(
		userQuery.data?.vegetarian ?? false
	)
	const [pescatarian, setPescatarian] = useState<boolean>(
		userQuery.data?.pescatarian ?? false
	)
	const [keto, setKeto] = useState<boolean>(userQuery.data?.keto ?? false)
	const [calories, setCalories] = useState<string>(
		userQuery.data?.calories ?? '2000'
	)

	const updatePrefsQuery = trpc.user.updatePreferences.useMutation()
	return (
		<SafeAreaView className='flex flex-col m-2'>
			<Text className='text-3xl font-bold mx-auto pb-2'>
				Welcome {route.params.name}
			</Text>
			<View className='flex'>
				<Text className='text-xl'>Calories</Text>
				<TextInput
					value={calories}
					keyboardType='numeric'
					onChangeText={setCalories}
					className='border rounded-2xl p-2 m-2'
				></TextInput>
			</View>
			<View className='flex'>
				<Switch
					value={vegan}
					onValueChange={() => setVegan(prev => !prev)}
				></Switch>
				<Text className='text-xl'>Vegan</Text>
			</View>
			<View className='flex'>
				<Switch
					value={vegetarian}
					onValueChange={() => setVegetarian(prev => !prev)}
				></Switch>
				<Text className='text-xl'>Vegetarian</Text>
			</View>
			<View className='flex'>
				<Switch
					value={pescatarian}
					onValueChange={() => setPescatarian(prev => !prev)}
				></Switch>
				<Text className='text-xl'>Pescatarian</Text>
			</View>
			<View className='flex'>
				<Switch
					value={keto}
					onValueChange={() => setKeto(prev => !prev)}
				></Switch>
				<Text className='text-xl'>Keto</Text>
			</View>
			<TouchableOpacity
				onPress={() =>
					updatePrefsQuery.mutate({
						name: route.params.name,
						calories: calories,
						vegan: vegan,
						vegetarian: vegetarian,
						pescatarian: pescatarian,
						keto: keto,
					})
				}
				className='border p-2 rounded bg-sky-500'
			>
				<Text className='w-fit'>Save Changes</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}
