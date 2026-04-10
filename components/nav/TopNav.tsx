import React from 'react';
import ThemeToggle from './theme/ThemeToggle';
import {
	Menubar,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import Link from 'next/link';
import Image from 'next/image';
export default function TopNav() {
	return (
		<Menubar className="m-2 border-none">
			<div className="flex-none">
				<MenubarMenu>
					<Link href="/">
						<Image
							src="/logo.svg"
							alt="logo"
							width={50}
							height={50}
							className="cursor-pointer"
						/>
					</Link>
				</MenubarMenu>
			</div>
			<div className=" flex flex-grow items-center justify-end gap-2">
				<MenubarMenu>
					<MenubarTrigger className="text-base font-normal">
						Dashboard
					</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>Task 1</MenubarItem>
						<MenubarItem>Task 2</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<ThemeToggle />
				</MenubarMenu>
			</div>
		</Menubar>
	);
}
