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

export default function TopNav() {
	return (
		<Menubar>
			<div className="flex-none">
				<MenubarMenu>Logo</MenubarMenu>
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
