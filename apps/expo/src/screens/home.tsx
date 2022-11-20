import React, { useState } from 'react'

import {
	SafeAreaView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export const HomeScreen = ({
	navigation,
	route,
}: {
	navigation: any
	route: any
}) => {
	const [vegan, setVegan] = useState<boolean>(false)
	const [vegetarian, setVegetarian] = useState<boolean>(false)
	const [pescatarian, setPescatarian] = useState<boolean>(false)
	const [keto, setKeto] = useState<boolean>(false)
	const [calories, setCalories] = useState<string>('2000')
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
		</SafeAreaView>
	)
}
