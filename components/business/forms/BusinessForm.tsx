'use client';
import React from 'react';
import { useBusiness } from '@/context/business';
import { BusinessState } from '@/utils/types/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PreviewCard from '@/components/business/preview/PreviewCard';
import { Loader2Icon, Send } from 'lucide-react';

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
	const { business, handleChange, handleSubmit, loading } = useBusiness();

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
									value={
										(business[
											item.name as keyof BusinessState
										] || '') as string | number
									}
								/>
							</div>
						);
					})}
					<Button
						onClick={handleSubmit}
						type="submit"
						className="my-5 w-full"
						disabled={
							!business.name ||
							!business.category ||
							!business.address ||
							loading
						}
					>
						{loading ? (
							<Loader2Icon className="animate-spin mr-2" />
						) : (
							<Send className="mr-2" />
						)}
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}
