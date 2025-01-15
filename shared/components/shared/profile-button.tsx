import React from 'react';
import { useSession } from 'next-auth/react'
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';
import { ProfileImage } from './profile-image';

interface Props {
	className?: string;
	onClickSignIn: () => void
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
	const { data: session } = useSession()

	
	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSignIn} variant='outline' className='flex items-center gap-1 sm:w-auto w-full'>
					<User size={16}/>
					Увійти
				</Button>
			): (
				<Link href='/profile'>
					<Button variant='outline' className='flex items-center gap-2 sm:w-auto w-full'>
						<ProfileImage image={session.user.image}/>
					</Button>
				</Link>
			)}
		</div>
	);
}