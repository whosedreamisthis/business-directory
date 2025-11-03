import React from 'react';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import ThemeToggle from './theme-toggle';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function TopNav() {
	return (
		<Menubar>
			<div className="flex-none">
				<MenubarMenu>
					<Link href="/">
						<Image
							src="/logo.svg"
							alt="logo"
							width={50}
							height={50}
							className="hover:cursor-pointer"
						/>
					</Link>
				</MenubarMenu>
			</div>
			<div className="flex grow items-center justify-end gap-1">
				<MenubarMenu>
					<MenubarTrigger className="text-base font-normal">
						<Link href="/dashboard">Dashboard</Link>
					</MenubarTrigger>
				</MenubarMenu>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
				<MenubarMenu>
					<ThemeToggle />
				</MenubarMenu>
			</div>
		</Menubar>
	);
}
