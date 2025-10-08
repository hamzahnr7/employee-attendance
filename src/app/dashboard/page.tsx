'use client';

import { Users } from '@/components/type/users-type';
import {
	Badge,
	Box,
	Button,
	Collapsible,
	Container,
	Heading,
	HStack,
	NativeSelect,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getAttr, reqDataUser } from './api';
import { ModalDialog } from '@/components/ui/dialog';
import { Statuses } from '@/generated/prisma';

export default function DashboardPage() {
	const [compName, setCompName] = useState('');
	const [listUser, setListUser] = useState<Users[]>();
	const [companyId, setCompanyId] = useState<number>();
	const [userStat, setUserStat] = useState<Statuses[]>();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session?.user.companyId && !listUser) {
			setCompanyId(session.user.companyId);
			console.log(companyId);
			if (companyId) {
				reqDataUser('', companyId).then(async (data) => {
					setListUser(data.data.user);
				});
			}
			getAttr('company', companyId).then((data) =>
				setCompName(data.data[0].desc)
			);
		}
	}, [listUser, session, companyId]);

	return (
		<Container hidden={status === 'loading' ? true : false}>
			{/* Navbar */}
			<HStack justifyContent={'space-between'} padding={'2vh'}>
				<Heading>Employee Attendance</Heading>
				<HStack gap={5}>
					<Text>{compName}</Text>
					<Button
						onClick={() => signOut({ callbackUrl: '/login', redirect: true })}
					>
						Logout
					</Button>
				</HStack>
			</HStack>
			{/* Body */}
			<HStack alignItems={'start'}>
				<VStack alignItems={'start'} flex={1} padding={10}>
					<HStack>
						<Heading>Staff List</Heading>
					</HStack>
					{listUser?.map((user) => {
						if (user.id == session?.user.id) return null;
						return (
							<HStack
								flexGrow={1}
								key={user.id}
								p={3}
								rounded={'lg'}
								border={'1px solid white'}
								width={'100%'}
							>
								<HStack justifyContent={'space-between'} width={'100%'}>
									<VStack alignItems={'start'}>
										<Text>{user.name}</Text>
										<Badge colorPalette={user.status.color}>
											Status : {user.status.name}
										</Badge>
									</VStack>
									<HStack>
										<Button
											variant={'plain'}
											color={'white'}
											onClick={() => {
												ModalDialog.open('list', {
													title: 'Attendance List',
													description: '',
													content: <></>,
												});
											}}
										>
											Attendances List
										</Button>
										<Button colorPalette={user.status.color}>
											{user.status.name === 'Request'
												? 'Approve'
												: user.status.name === 'Active'
												? 'Suspend'
												: user.status.name === 'Suspend'
												? 'Activate'
												: ''}
										</Button>
									</HStack>
								</HStack>
								{/* <Badge
												onClick={() => {
													getAttr('status').then(async (data) => {
														setUserStat(data.data);
														console.log(data.data);
													});
													ModalDialog.open('a', {
														title: 'Update Status',
														description:
															'Approve new user or suspend an active user',
														content: (
															<VStack>
																<NativeSelect.Root>
																	<NativeSelect.Field
																		color={'black'}
																		defaultValue={user.statusId}
																	>
																		{userStat?.map((stat) => {
																			if (
																				stat.name === 'Request' &&
																				user.status.name == 'Active'
																			)
																				return null;
																			if (stat.type === 'user')
																				return (
																					<option key={stat.id} value={stat.id}>
																						{stat.name}
																					</option>
																				);
																		})}
																	</NativeSelect.Field>
																	<NativeSelect.Indicator />
																</NativeSelect.Root>
																<Button
																	alignSelf={'end'}
																	onClick={() => alert('saved')}
																>
																	Save
																</Button>
															</VStack>
														),
													});
												}}
												colorPalette={user.status.color}
											>
												{user.status.name}
											</Badge> */}
								{/* <Collapsible.Root width={'100%'}>
									<Collapsible.Trigger width={'100%'}>
									</Collapsible.Trigger>
									<Collapsible.Content>key : {user.id}</Collapsible.Content>
								</Collapsible.Root> */}
								<Text></Text>
							</HStack>
						);
					})}
				</VStack>
			</HStack>
			{/* Modal View */}
			<ModalDialog.Viewport />
		</Container>
	);
}
