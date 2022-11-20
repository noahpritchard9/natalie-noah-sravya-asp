import { Link } from '@react-navigation/native'
import React, { useState } from 'react'

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import { trpc } from '../utils/trpc'
import { SignUp } from './signup'

export const LogIn = ({ navigation }: { navigation: any }) => {
	const [loginError, setLoginError] = useState<string>('')
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const loginQuery = trpc.user.byName.useQuery({
		name: username,
		password: password,
	})

	return (
		<SafeAreaView>
			<View className='flex items-center justify-center p-4 gap-2'>
				<Text className='text-5xl font-bold'>Welcome</Text>
				{loginError && <Text className='text-red-500'>{loginError}</Text>}
				<TextInput
					value={username}
					placeholder='Username'
					onChangeText={setUsername}
					className='border p-2 rounded-xl w-3/4'
				></TextInput>
				<TextInput
					value={password}
					placeholder='Password'
					onChangeText={setPassword}
					secureTextEntry={true}
					className='border p-2 rounded-xl w-3/4'
				></TextInput>
				<TouchableOpacity
					onPress={() =>
						loginQuery.data
							? navigation.navigate('Home', { name: username })
							: setLoginError('Account not found, please try again.')
					}
					className='border rounded-xl bg-blue-400 p-4 w-2/5 items-center'
				>
					<Text>Log In</Text>
				</TouchableOpacity>

				<Text>
					Need an account?{' '}
					<Text
						onPress={() => navigation.navigate('Sign Up', { name: username })}
						className='text-blue-500 underline'
					>
						Sign up
					</Text>
				</Text>
			</View>
		</SafeAreaView>
	)
}
