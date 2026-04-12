'use client';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useBusiness } from '@/context/business';
import { Loader2Icon, Send, Brain } from 'lucide-react';

export default function DescriptionModal() {
	const {
		openDescriptionModal,
		setOpenDescriptionModal,
		business,
		generateBusinessDescription,
		generateDescriptionLoading,
	} = useBusiness();
	return (
		<Dialog
			open={openDescriptionModal}
			onOpenChange={setOpenDescriptionModal}
		>
			<DialogContent className="sm:max-w-175">
				<DialogHeader>
					<DialogTitle>Business Description</DialogTitle>
					<DialogDescription>
						Make changes to your business description here. Click
						save when you are done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center gap-2">
					<div className="grid flex-1 gap-2"></div>
				</div>
				<DialogFooter className="sm:justify-start">
					<div className="flex justify-between items-center gap-5">
						<Button
							variant="outline"
							onClick={generateBusinessDescription}
							className="my-5 border-2 border-slate-600 
							dark:border-slate-300"
							disabled={
								!business.name ||
								!business.category ||
								!business.address ||
								generateDescriptionLoading
							}
						>
							{generateDescriptionLoading ? (
								<Loader2Icon className="animate-spin mr-2" />
							) : (
								<Brain className="mr-2" />
							)}
							Generate Description with AI
						</Button>
						<Button
							variant="outline"
							type="submit"
							className="my-5"
							onClick={() => {
								setOpenDescriptionModal(false);
							}}
							disabled={
								!business.name ||
								!business.category ||
								!business.address ||
								generateDescriptionLoading
							}
						>
							Save
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
