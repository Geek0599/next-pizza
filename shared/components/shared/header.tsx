'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import { Container } from './container'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props{
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string
}

export const Header:React.FC<Props> = ({ hasSearch = true, hasCart = true, className}) =>{
	const [openAuthModal, setOpenAuthModal] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(()=>{
		if(searchParams.has('verified')){
			setTimeout(()=>{
				toast.success('Ваш аккаунт успішно підтверджений! Тепер ви можете авторизуватися.', {
					icon: '✅'
				})
				router.replace('/')
			}, 500)
		}
	}, [])

	return (
		<header className={cn('border-b', className)}>
			<Container className='md:flex items-center justify-between py-8 grid grid-cols-[auto_auto] gap-y-6 max-[520px]:grid-cols-1'>
				{/* Left side */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' alt='Logo' width={35} height={35} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
							<p className='text-sm text-gray-400 leading-3'>Смічніше вже нікуди</p>
						</div>
					</div>
				</Link>

				{hasSearch && (
					<div className="ld:mx-10 md:mx-5 flex-1 row-start-2 col-span-full max-[520px]:row-start-3">
						<SearchInput/>
					</div>
				)}

				{/* Right side */}
				<div className="flex items-center gap-3">

					<AuthModal open={openAuthModal} onClose={()=>{setOpenAuthModal(false)}} />

					<ProfileButton className='max-[520px]:flex-1 max-[520px]:basis-1/2' onClickSignIn={()=>{setOpenAuthModal(true)}} />
					{hasCart && <CartButton className='max-[520px]:flex-1 max-[520px]:basis-1/2' />}	
				</div>
			</Container>
		</header>
	)
}