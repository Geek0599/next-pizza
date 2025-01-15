'use client';
import React, { useState } from 'react';
import { TabBar } from './tab-bar';
import { ProfileForm } from './profile-form';
import { User } from '@prisma/client';
import { ProfileOrders } from './profile-orders';


interface Props {
	className?: string;
	user: User
}
const tabItems = [{name: 'Мої замовлення', id: 2}, { name: 'Мої дані', id: 1 }]

export const Profile: React.FC<Props> = ({ className, user }) => {
	const [tabActiveName, setTabActiveName] = useState(tabItems[0])
	return (
		<div className={className}>
			<TabBar 
				className="p-2 mb-7" 
				items={tabItems} 
				activeTabId={tabActiveName.id}
				onClick={(item)=>{ setTabActiveName(item)}}
			/>
			{
				tabActiveName.name === 'Мої дані' ? (
					<ProfileForm user={user}/>	
				) : (
					<ProfileOrders />
				)
			}

		</div>
	);
}