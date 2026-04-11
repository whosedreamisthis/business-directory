'use client';

import React from 'react';
import { MenubarMenu, MenubarTrigger } from '../ui/menubar';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useBusiness } from '@/context/business';
import { useRouter } from 'next/navigation';

export default function AddBusinessButton() {
	const { setBusiness, initialState } = useBusiness();
	const router = useRouter();

	const handleClick = () => {
		setBusiness(initialState);
		router.push('/business/add');
	};

	return (
		<MenubarMenu>
			<MenubarTrigger
				asChild
				className="text-base font-normal cursor-pointer"
			>
				{/* <Link href="/business/add"> */}
				<span
					onClick={handleClick}
					className="flex items-center cursor-pointer"
				>
					<Plus size={16} className="mr-2" />
					<span>Add Business</span>
				</span>
				{/* </Link> */}
			</MenubarTrigger>
		</MenubarMenu>
	);
}
