'use client';

import { Bus } from 'lucide-react';
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { BusinessState } from '@/utils/types/business';
import { useClerk, useUser } from '@clerk/nextjs';

const initialState: BusinessState = {
	_id: '',
	userEmail: '',
	name: '',
	description: '',
	address: '',
	phone: '',
	website: '',
	category: '',
	email: '',
	hours: '',
	logo: '',
	abn: '',
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
	handleSubmit: (e: React.FormEvent) => void;
}
const BusinessContext = createContext<BusinessContextType | undefined>(
	undefined
);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [business, setBusiness] = useState<BusinessState>(initialState);
	const [loading, setLoading] = useState<boolean>(false);

	const { openSignIn } = useClerk();
	const { isSignedIn } = useUser();
	useEffect(() => {
		const savedBusiness = localStorage.getItem('business');
		if (savedBusiness) {
			setBusiness(JSON.parse(savedBusiness));
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setBusiness((prevBusiness: BusinessState) => {
			const updatedBusiness = { ...prevBusiness, [name]: value };

			localStorage.setItem('business', JSON.stringify(updatedBusiness));
			return updatedBusiness;
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!isSignedIn) {
			openSignIn();
			return;
		} else {
			alert('save business');
		}
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

export const useBusiness = (): BusinessContextType => {
	const context = useContext(BusinessContext);
	if (!context) {
		throw new Error('useBusiness must be used within a BusinessProvider');
	}
	return context;
};
