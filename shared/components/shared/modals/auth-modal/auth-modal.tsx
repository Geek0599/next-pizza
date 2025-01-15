'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogContent } from '@/shared/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm, RegisterForm} from './form';
import { cn } from '@/shared/lib/utils';

interface Props {
	className?: string;
	open: boolean;
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ className, open, onClose}) => {
	const [type, setType] = useState<'login' | 'register'>('login')
	const [loading, setLoading] = useState(false)

	const handleClose = () => {
		onClose()
	}

	const onSwitchType = () => {
		setType((state)=> state === 'login' ? 'register': 'login')
	}

	const onSingIn = (privider: string) => {
		setLoading(true)
		signIn(privider, {
			callbackUrl: '/'
		}).finally(()=>{
			setLoading(false)
		})
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className={cn(`w- max-h-full overflow-auto shadow-none border-transparent sm:p-3 p-2 transition-none`, {'max-w-[450px]': type === 'login', 'max-w-[600px]': type === 'register'})}>
				<div className="sm:p-7 p-5 bg-white">
					<div className={cn("pb-4", {'pointer-events-none opacity-50': loading})}>
						{
							type === 'login' ? <LoginForm onClose={handleClose}/> : <RegisterForm setType={()=> setType('login')} />
						}
					</div>

					<hr/>

					<div className="flex gap-2 py-4">
						<Button disabled={loading}
							variant={'secondary'}
							onClick={()=>{onSingIn('github')}}
							type='button'
							className='gap-2 h-12 p-2 flex-1 hover:bg-[rgb(255_225_208)]'
						>
							<img className='w-6 h-6' 
								src="https://github.githubassets.com/favicons/favicon.svg" 
								alt="GitHub icon" 
							/>
							GitHub
						</Button>

						<Button
							disabled={loading}
							variant={'secondary'}
							onClick={()=>{onSingIn('google')}}
							type='button'
							className='gap-2 h-12 p-2 flex-1 hover:bg-[rgb(255_225_208)]'
						>
							<img className='w-6 h-6' 
								src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" 
								alt="Google icon" 
							/>
							Google
						</Button>
					</div>

					<Button disabled={loading} variant={'outline'} onClick={onSwitchType} type='button' className='h-12 w-full'>
						{type !== 'login' ? 'Вхід до аккунту': 'Реєстрація'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}