'use client';

import React, { useState } from 'react';
import {
	Box,
	Heading,
	Input,
	Button,
	VStack,
	InputGroup,
	Card,
	CardBody,
	CardHeader,
	Field,
} from '@chakra-ui/react';
import { BiLock } from 'react-icons/bi';
import { MdOutlineEmail } from 'react-icons/md';
import { signIn } from 'next-auth/react';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(!loading);
		const url = new URL(window.location.href);
		const callUrl = url.searchParams.get('to');

		const login = await signIn('credentials', {
			email,
			password,
			callbackUrl: callUrl ?? '/',
		});

		console.log(login);

		setEmail('');
		setPassword('');
		setLoading(!loading);
	};

	return (
		<Box
			as="main"
			display="flex"
			justifyContent="center"
			alignItems="center"
			minH="100vh"
			bgGradient="linear(to-br, blue.500, purple.500)"
			p={4}
		>
			<Card.Root
				width="100%"
				maxWidth="450px"
				bg="white"
				p={6}
				boxShadow="xl"
				borderRadius="xl"
			>
				<CardHeader textAlign="center" p={0}>
					<Heading as="h1" size="xl" mb={4} color="gray.800">
						Selamat Datang!
					</Heading>
					<Heading as="h2" size="sm" color="gray.500" fontWeight="normal">
						Silakan login untuk melanjutkan
					</Heading>
				</CardHeader>

				<CardBody pt={8} pb={0}>
					<form onSubmit={(e) => handleSubmit(e)}>
						<VStack gap={6}>
							<Field.Root id="email">
								<Field.Label>Email</Field.Label>

								<InputGroup startElement={<MdOutlineEmail />}>
									<Input
										type="email"
										placeholder="Masukkan email Anda"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</InputGroup>
							</Field.Root>

							<Field.Root id="password">
								<Field.Label>Password</Field.Label>
								<InputGroup startElement={<BiLock />}>
									<Input
										type="password"
										placeholder="Masukkan password Anda"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</InputGroup>
							</Field.Root>

							<Button
								loading={loading}
								type="submit"
								colorScheme="blue"
								size="lg"
								width="full"
								mt={4}
							>
								Login
							</Button>
						</VStack>
					</form>
				</CardBody>
			</Card.Root>
		</Box>
	);
}

export default LoginPage;
