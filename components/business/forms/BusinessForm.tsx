'use client';
import React from 'react';
import { useBusiness } from '@/context/business';
import { BusinessState } from '@/utils/types/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PreviewCard from '@/components/business/preview/PreviewCard';
import { Loader2Icon, Send, Brain } from 'lucide-react';

interface InputField {
	name: string;
	type: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	accept?: string;
}

const inputFields: InputField[] = [
	{
		name: 'name',
		label: 'Business Name',
		type: 'text',
		required: true,
	},
	{
		name: 'category',
		label: 'Category (e.g. Construction, Cafe, etc.)',
		type: 'text',
		required: true,
	},
	{
		name: 'address',
		label: 'Business Address',
		type: 'text',
		required: true,
	},
	{
		name: 'phone',
		label: 'Phone Number',
		type: 'tel',
	},
	{
		name: 'email',
		label: 'Email Address',
		type: 'email',
		required: true,
	},
	{
		name: 'website',
		label: 'Website URL',
		type: 'url',
	},
	{
		name: 'hours',
		label: 'Opening Hours (e.g. Mon-Fri 9am-5pm)',
		type: 'text',
		required: true,
	},
	{
		name: 'bn',
		label: 'BN (Business Number)',
		type: 'number',
	},
	{
		name: 'logo',
		label: 'Logo (Upload square image)',
		type: 'file',
		accept: 'image/*',
	},
];

export default function BusinessForm() {
	const {
		business,
		handleChange,
		handleSubmit,
		loading,
		logoUploading,
		generateBusinessDescription,
		generateDescriptionLoading,
		updateBusiness,
		isEditPage,
	} = useBusiness();

	return (
		<div className="flex flex-col lg:flex-row h-screen">
			<div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center overflow-y-auto min-h-88.5">
				<PreviewCard business={business} />
			</div>
			<div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex  overflow-y-auto">
				<h1>
					List your business for free and reach out to millions of
					customers
				</h1>
				<form>
					{inputFields.map((item, index) => {
						const isFile = item.type === 'file';
						return (
							<div key={index} className="my-2 w-full">
								<label htmlFor={item.name} className="text-xs">
									{item.label}
								</label>
								<Input
									name={item.name}
									id={item.name}
									type={item.type}
									required={item.required}
									onChange={handleChange}
									accept={item.accept}
									value={
										isFile
											? ''
											: (business[
													item.name as keyof BusinessState
											  ] as string | number) || ''
									}
								/>
								{logoUploading && item.name === 'logo' && (
									<div className="absolute inset-0 flex items-center justify-center bg-white/50">
										<Loader2Icon
											className="animate-spin"
											size={32}
										/>
									</div>
								)}
							</div>
						);
					})}
					<div className="flex justify-between items-center">
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
							onClick={isEditPage ? updateBusiness : handleSubmit}
							type="submit"
							className="my-5"
							disabled={
								!business.name ||
								!business.category ||
								!business.address ||
								loading ||
								generateDescriptionLoading
							}
						>
							{loading ? (
								<Loader2Icon className="animate-spin mr-2" />
							) : (
								<Send className="mr-2" />
							)}
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
