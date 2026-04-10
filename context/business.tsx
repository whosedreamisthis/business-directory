'use client';

import React, { useContext, createContext, useState, ReactNode } from 'react';
import { BusinessState } from '@/utils/types/business';

const intialState: BusinessState = {
	_id: '',
	userEmail: '',
	name: '',
	category: '',
	description: '',
	address: '',
	phone: '',
	website: '',
	hours: '',
	logo: '',
	bn: '',
	slug: '',
	createdAt: '',
	updatedAt: '',
	__v: 0,
};

interface BusinessContextType {
	business: BusinessState;
	setBusiness: React.Dispatch<React.SetStateAction<BusinessState>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: (e: React.MouseEvent) => void;
}
const BusinessContext = createContext<BusinessContextType | undefined>(
	undefined,
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [business, setBusiness] = useState<BusinessState>(intialState);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBusiness((prevBusiness: BusinessState) => {
			const updatedBusiness = { ...prevBusiness, [name]: value };
			return updatedBusiness;
		});
	};

	const handleSubmit = (e: React.MouseEvent) => {
		e.preventDefault();
		console.log(business);
	};

	return (
		<BusinessContext.Provider
			value={{
				business,
				setBusiness,
				loading,
				setLoading,
				handleChange,
				handleSubmit,
			}}
		>
			{children}
		</BusinessContext.Provider>
	);
};

export const useBusiness = () => {
	const context = useContext(BusinessContext);

	if (!context) {
		throw new Error('useBusiness must be used within a BusinessProvider');
	}
	return context;
};
