import React, { useEffect, useState } from 'react';

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { trpc } from '../utils/trpc';

export const LogIn = ({ navigation }: { navigation: any }) => {
	const [loginError, setLoginError] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const loginQuery = trpc.user.byName.useQuery(username);

	const [loginDisabled, setLoginDisabled] = useState(false);

	useEffect(() => {
		setLoginDisabled(username === '' || password === '');
	});

	const enabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center';

	const disabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center opacity-50';

	return (
		<SafeAreaView className='w-full h-full'>
			<View className='flex items-center justify-center mt-4'>
				<Text className='text-5xl font-bold'>Welcome to</Text>
				<Text className='text-5xl font-bold text-sky-500'>AMP!</Text>
				{loginError && <Text className='text-red-500'>{loginError}</Text>}
				<TextInput
					value={username}
					placeholder='Username'
					onChangeText={setUsername}
					className='border p-2 rounded-xl w-3/4 my-2'
				></TextInput>
				<TextInput
					value={password}
					placeholder='Password'
					onChangeText={setPassword}
					secureTextEntry={true}
					className='border p-2 rounded-xl w-3/4 mb-2'
				></TextInput>

				<Text className='mt-4'>
					Need an account?{' '}
					<Text
						onPress={() => navigation.navigate('Sign Up', { name: username })}
						className='text-sky-500 underline'
					>
						Sign up
					</Text>
				</Text>
			</View>
			<View className='flex items-center justify-center h-screen'>
				<TouchableOpacity
					onPress={() =>
						loginQuery.data
							? navigation.navigate('Recipes', { name: username })
							: setLoginError('Account not found, please try again.')
					}
					className={loginDisabled ? disabledClass : enabledClass}
				>
					<Text>Log In</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
