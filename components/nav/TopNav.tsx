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
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
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
							className="h-auto w-auto cursor-pointer"
							priority // Adding priority since this is a logo in the navbar
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
				<Show when="signed-out">
					<SignInButton mode="modal">
						<Button className="cursor-pointer text-sm font-medium hover:text-slate-500 transition-colors">
							Sign In
						</Button>
					</SignInButton>
				</Show>
				<Show when="signed-in">
					<UserButton />
				</Show>
				<MenubarMenu>
					<ThemeToggle />
				</MenubarMenu>
			</div>
		</Menubar>
	);
}
