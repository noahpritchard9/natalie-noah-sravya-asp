import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TRPCProvider } from './utils/trpc'

import { HomeScreen } from './screens/home'
import { LogIn } from './screens/login'
import { SignUp } from './screens/signup'

const Stack = createNativeStackNavigator()

export const App = () => {
	return (
		<NavigationContainer>
			<TRPCProvider>
				<SafeAreaProvider>
					<Stack.Navigator>
						<Stack.Screen name='Log In' component={LogIn} />
						<Stack.Screen name='Sign Up' component={SignUp} />
						<Stack.Screen name='Home' component={HomeScreen} />
					</Stack.Navigator>
					<StatusBar />
				</SafeAreaProvider>
			</TRPCProvider>
		</NavigationContainer>
	)
}
