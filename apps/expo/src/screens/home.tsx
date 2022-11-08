import React from 'react'

import {
	SafeAreaView,
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
	return (
		<SafeAreaView>
			<View className='h-full w-full p-4'>
				<Text className='text-5xl font-bold mx-auto pb-2'>
					Welcome {route.params.name}
				</Text>
			</View>
		</SafeAreaView>
	)
}
