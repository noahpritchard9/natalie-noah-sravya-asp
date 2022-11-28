import React, { useState } from 'react';

import {
	SafeAreaView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { trpc } from '../utils/trpc';

export const HomeScreen = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const userQuery = trpc.user.byName.useQuery(route.params.name);

	const [vegan, setVegan] = useState<boolean>(userQuery.data?.vegan ?? false);
	const [vegetarian, setVegetarian] = useState<boolean>(
		userQuery.data?.vegetarian ?? false
	);
	const [pescatarian, setPescatarian] = useState<boolean>(
		userQuery.data?.pescatarian ?? false
	);
	const [keto, setKeto] = useState<boolean>(userQuery.data?.keto ?? false);
	const [dairy, setDairy] = useState<boolean>(userQuery.data?.dairy ?? false);
	const [gluten, setGluten] = useState<boolean>(
		userQuery.data?.gluten ?? false
	);
	const [shellfish, setShellfish] = useState<boolean>(
		userQuery.data?.shellfish ?? false
	);
	const [peanuts, setPeanuts] = useState<boolean>(
		userQuery.data?.peanuts ?? false
	);
	const [calories, setCalories] = useState<string>(
		userQuery.data?.calories ?? '2000'
	);

	const [calsRemaining, setCalsRemaining] = useState<string>(
		userQuery.data?.calsRemaining ?? '2000'
	);

	const updatePrefsQuery = trpc.user.updatePreferences.useMutation();
	return (
		<SafeAreaView className='w-full h-full'>
			<View className='flex ml-2 mt-2'>
				<Text className='text-xl'>Daily Calories</Text>
				<TextInput
					value={calories}
					keyboardType='numeric'
					onChangeText={setCalories}
					className='border rounded-2xl p-2 m-2'
				></TextInput>
				<Text className='text-xl'>Remaining Calories</Text>
				<TextInput
					value={calsRemaining}
					keyboardType='numeric'
					onChangeText={setCalsRemaining}
					className='border rounded-2xl p-2 m-2'
				></TextInput>
				<Text className='text-xl'>Dietary Preferences</Text>
				<View className='flex flex-row mb-1'>
					<Switch
						value={vegan}
						onValueChange={() => setVegan(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Vegan</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={vegetarian}
						onValueChange={() => setVegetarian(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Vegetarian</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={pescatarian}
						onValueChange={() => setPescatarian(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Pescatarian</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={keto}
						onValueChange={() => setKeto(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Keto</Text>
				</View>
				<Text className='text-xl mt-2'>Dietary Intolerances</Text>
				<View className='flex flex-row mb-1'>
					<Switch
						value={dairy}
						onValueChange={() => setDairy(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Dairy</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={gluten}
						onValueChange={() => setGluten(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Gluten</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={shellfish}
						onValueChange={() => setShellfish(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Shellfish</Text>
				</View>
				<View className='flex flex-row mb-1'>
					<Switch
						value={peanuts}
						onValueChange={() => setPeanuts(prev => !prev)}
					></Switch>
					<Text className='text-xl ml-1'>Peanuts</Text>
				</View>
			</View>
			<TouchableOpacity
				onPress={() =>
					updatePrefsQuery.mutate({
						name: route.params.name,
						calories: calories,
						calsRemaining: calsRemaining,
						vegan: vegan,
						vegetarian: vegetarian,
						pescatarian: pescatarian,
						keto: keto,
						dairy: dairy,
						gluten: gluten,
						shellfish: shellfish,
						peanuts: peanuts,
					})
				}
				className='border m-2 p-2 rounded-3xl bg-sky-400 items-center'
			>
				<Text className='w-fit'>Save Changes</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('Recipes', { name: route.params.name })
				}
				className='border mx-2 p-2 rounded-3xl bg-sky-400 items-center'
			>
				<Text>See Recipes</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};
