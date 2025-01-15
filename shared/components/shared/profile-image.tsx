'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import { CircleUser } from 'lucide-react';


interface Props {
	image: string;
}

export const ProfileImage: React.FC<Props> = ({ image }) => {
	const [imageError, setImageError] = useState(false);	
	return (
		<span className='flex items-center gap-2 leading-4'>
			{
				image && !imageError ? 
				<div className='w-[20px] h-[20px] rounded-full overflow-hidden'>
					<Image 
						className='object-cover' width={22} height={22} src={image} alt="User image"
						referrerPolicy="no-referrer"
						onError={() => setImageError(true)}
					/>
				</div> :
				<CircleUser size={20}/>
			}
			Профіль та <br /> мої замовлення
		</span>
	);
}