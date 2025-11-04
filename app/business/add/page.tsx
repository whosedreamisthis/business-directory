'use client';
import React, { use } from 'react';
import { useBusiness } from '@/context/business';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Divide } from 'lucide-react';
import PreviewCard from '@/components/business/preview/preview-card';
import { BusinessState } from '@/utils/types/business';

interface InputField {
	name: string;
	label: string;
	type: string;
	// placeholder?: string;
	required?: boolean;
	accept?: string;
}

// name category drescription address phone website email hours logo
const inputFields: InputField[] = [
	{
		name: 'name',
		label: 'Business Name',
		type: 'text',
		required: true,
	},
	{
		name: 'category',
		label: 'Category (e.g. Construction, Cafes, etc.)',
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
		label: 'Phone',
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
		label: 'Openning Hours (e.g. Mon-Fri 9am-5pm)',
		type: 'text',
	},
	{
		name: 'abn',
		label: 'ABN (Australian Business Number)',
		type: 'number',
	},
	{
		name: 'logo',
		label: 'Business Logo (upload square image)',
		type: 'file',
		accept: 'image/*',
	},
];
export default function AddBusinessPage() {
	const { business, handleChange, handleSubmit } = useBusiness();

	return (
		<div className="flex flex-col lg:flex-row h-minus-nav">
			<div className="flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center overflow-y-auto min-h-[354px]">
				<PreviewCard business={business} />
			</div>
			<div className="flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex  overflow-y-auto">
				<h1>
					List your business for free and reach out to millions of
					customers
				</h1>
				{inputFields.map((item, index) => {
					return (
						<div key={index} className="my-2 w-full">
							<label htmlFor={item.name} className="text-xs">
								{item.label}
							</label>
							<Input
								name={item.name}
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
				<Button onClick={handleSubmit} type="submit" className="my-5">
					Submit
				</Button>
			</div>
		</div>
	);
}
