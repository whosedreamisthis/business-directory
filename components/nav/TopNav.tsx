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
import { Button } from '../ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { LayoutDashboard, Plus, LogIn } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import AddBusinessButton from '../buttons/AddBusinessButton';

export default async function TopNav() {
	const user = await currentUser();

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
				<AddBusinessButton />
				{user && (
					<MenubarMenu>
						<MenubarTrigger
							asChild
							className="text-base font-normal cursor-pointer"
						>
							<Link href="/dashboard">
								<span className="flex items-center">
									<LayoutDashboard
										size={16}
										className="mr-2"
									/>
									<span>Dashboard</span>
								</span>
							</Link>
						</MenubarTrigger>
					</MenubarMenu>
				)}

				<Show when="signed-out">
					<SignInButton mode="modal">
						<Button
							variant="ghost"
							className="cursor-pointer text-sm font-medium  transition-colors"
						>
							<span className="flex items-center">
								<LogIn size={16} className="mr-2" />
								<span>Sign In</span>
							</span>
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
			<Toaster />
		</Menubar>
	);
}
