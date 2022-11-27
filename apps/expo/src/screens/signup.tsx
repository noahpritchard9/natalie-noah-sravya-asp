import React, { useEffect, useState } from 'react';

import {
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { trpc } from '../utils/trpc';

export const SignUp = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const [username, setUsername] = useState<string>(route.params.name ?? '');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [signUpError, setSignUpError] = useState<string>('');

	const signUpQuery = trpc.user.create.useMutation({
		onError() {
			setSignUpError('Account already exists, please try again.');
		},
	});

	const [signUpDisabled, setSignUpDisabled] = useState(false);

	useEffect(() => {
		setSignUpDisabled(
			username === '' || password === '' || confirmPassword === ''
		);
	});

	const enabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center';

	const disabledClass =
		'relative bottom-0 border rounded-3xl bg-sky-400 p-4 w-3/4 items-center opacity-50';

	return (
		<SafeAreaView className='w-full h-full'>
			<View className='flex items-center justify-center p-4'>
				<Text className='text-4xl font-bold'>Create an Account</Text>
				{signUpError && <Text className='text-red-500'>{signUpError}</Text>}
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
				<TextInput
					value={confirmPassword}
					placeholder='Confirm Password'
					onChangeText={setConfirmPassword}
					secureTextEntry={true}
					className='border p-2 rounded-xl w-3/4'
				></TextInput>
			</View>
			<View className='flex items-center justify-center h-screen'>
				<TouchableOpacity
					onPress={() => {
						if (password === confirmPassword) {
							signUpQuery.mutate({ name: username, password: password });
							if (signUpError !== '') {
								navigation.navigate('Home', { name: username });
							}
						} else {
							setSignUpError('Passwords do not match, please try again.');
						}
					}}
					// disabled={
					// 	password === '' || confirmPassword === '' || username === ''
					// }
					disabled={signUpDisabled}
					className={signUpDisabled ? disabledClass : enabledClass}
				>
					<Text>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};
